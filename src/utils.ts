import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 获取MCP工作目录
 * 参考PromptX的实现，支持IDE环境变量
 */
export function getMCPWorkingDirectory(): string {
  console.error('🔍 [workflow3] ===== 获取MCP工作目录诊断开始 =====');
  console.error(`🔍 [workflow3] process.cwd(): ${process.cwd()}`);
  
  // 策略1：IDE环境变量 - WORKSPACE_FOLDER_PATHS
  const workspacePaths = process.env.WORKSPACE_FOLDER_PATHS;
  console.error(`🔍 [workflow3] 策略1 - WORKSPACE_FOLDER_PATHS: ${workspacePaths || 'undefined'}`);
  if (workspacePaths) {
    try {
      const folders = JSON.parse(workspacePaths);
      if (Array.isArray(folders) && folders.length > 0) {
        const firstFolder = folders[0];
        if (isValidDirectory(firstFolder)) {
          console.error(`🔍 [workflow3] 策略1成功: ${firstFolder}`);
          return firstFolder;
        }
      }
    } catch {
      // 忽略解析错误，尝试直接使用
      const firstPath = workspacePaths.split(path.delimiter)[0];
      if (firstPath && isValidDirectory(firstPath)) {
        console.error(`🔍 [workflow3] 策略1备用成功: ${firstPath}`);
        return firstPath;
      }
    }
  }

  // 策略2：其他IDE环境变量
  const ideEnvVars = [
    'VSCODE_WORKSPACE_FOLDER',
    'VSCODE_CWD',
    'PROJECT_ROOT',
    'IDEA_INITIAL_DIRECTORY',
    'WEBSTORM_PROJECT_PATH'
  ];
  
  for (const envVar of ideEnvVars) {
    const envValue = process.env[envVar];
    console.error(`🔍 [workflow3] 策略2 - ${envVar}: ${envValue || 'undefined'}`);
    if (envValue && isValidDirectory(envValue)) {
      console.error(`🔍 [workflow3] 策略2成功: ${envValue}`);
      return envValue;
    }
  }

  // 策略3：PWD环境变量
  const pwd = process.env.PWD;
  console.error(`🔍 [workflow3] 策略3 - PWD: ${pwd || 'undefined'}`);
  if (pwd && isValidDirectory(pwd) && pwd !== process.cwd()) {
    console.error(`🔍 [workflow3] 策略3成功: ${pwd}`);
    return pwd;
  }

  // 策略4：项目根目录查找
  const projectRoot = findProjectRoot(process.cwd());
  console.error(`🔍 [workflow3] 策略4结果: ${projectRoot || 'null'}`);
  if (projectRoot && projectRoot !== process.cwd()) {
    console.error(`🔍 [workflow3] 策略4成功: ${projectRoot}`);
    return projectRoot;
  }

  // 策略5：回退到当前目录
  const fallbackPath = process.cwd();
  console.error(`🔍 [workflow3] 策略5 - 回退到process.cwd(): ${fallbackPath}`);
  console.error('🔍 [workflow3] ===== 获取MCP工作目录诊断结束 =====');
  return fallbackPath;
}

/**
 * 验证目录是否有效
 */
function isValidDirectory(dir: string): boolean {
  try {
    if (!dir || typeof dir !== 'string') {
      return false;
    }
    
    const resolvedDir = path.resolve(dir);
    const stat = fs.statSync(resolvedDir);
    
    return stat.isDirectory();
  } catch {
    return false;
  }
}

/**
 * 查找项目根目录
 * 从当前工作目录开始，向上查找包含项目标识文件的目录
 */
export function findProjectRoot(startDir: string = process.cwd()): string {
  const projectMarkers = [
    'package.json',
    '.git',
    'yarn.lock',
    'pnpm-lock.yaml',
    'composer.json',
    'Cargo.toml',
    'go.mod',
    'pyproject.toml',
    'requirements.txt'
  ];

  let currentDir = path.resolve(startDir);
  const rootDir = path.parse(currentDir).root;

  while (currentDir !== rootDir) {
    // 检查是否存在项目标识文件
    const hasProjectMarker = projectMarkers.some(marker => {
      const markerPath = path.join(currentDir, marker);
      return fs.existsSync(markerPath);
    });

    if (hasProjectMarker) {
      return currentDir;
    }

    // 向上一级目录
    currentDir = path.dirname(currentDir);
  }

  // 如果没有找到项目根目录，返回当前工作目录
  return startDir;
}

/**
 * 获取默认模板文件路径
 */
export function getTemplateFilePath(): string {
  return path.join(__dirname, 'templates', 'workflow3.md');
}

/**
 * 读取模板文件内容
 */
export function readTemplateContent(): string {
  const templatePath = getTemplateFilePath();
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found: ${templatePath}`);
  }
  
  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * 获取或创建用户主目录中的.workflow3.md文件内容
 */
export function getOrCreateWorkflowFile(): string {
  try {
    // 1. 使用用户主目录路径
    const workflowFilePath = path.join(os.homedir(), '.workflow3.md');
    
    console.error(`🔍 [workflow3] 目标文件路径: ${workflowFilePath}`);
    
    // 2. 处理旧的项目根目录文件
    handleLegacyWorkflowFile();
    
    // 3. 检查用户主目录文件是否存在
    if (fs.existsSync(workflowFilePath)) {
      // 文件存在，读取用户自定义内容
      console.error(`✅ [workflow3] 读取现有文件: ${workflowFilePath}`);
      return fs.readFileSync(workflowFilePath, 'utf-8');
    } else {
      // 文件不存在，创建默认文件
      console.error(`📝 [workflow3] 创建新文件: ${workflowFilePath}`);
      const defaultContent = readTemplateContent();
      
      // 写入默认内容到用户主目录
      fs.writeFileSync(workflowFilePath, defaultContent, 'utf-8');
      console.error(`✅ [workflow3] 文件创建成功: ${workflowFilePath}`);
      
      return defaultContent;
    }
  } catch (error) {
    console.error(`❌ [workflow3] 文件操作失败: ${error}`);
    // 发生错误时，返回模板内容作为fallback
    console.error('🔄 [workflow3] 使用模板内容作为fallback');
    return readTemplateContent();
  }
}

/**
 * 处理项目根目录中的旧workflow3.md文件
 */
function handleLegacyWorkflowFile(): void {
  try {
    const projectRoot = getMCPWorkingDirectory();
    const legacyFilePath = path.join(projectRoot, 'workflow3.md');
    
    if (fs.existsSync(legacyFilePath)) {
      const content = fs.readFileSync(legacyFilePath, 'utf-8');
      
      // 检查是否已经是失效提示文件
      if (content.includes('本文件已失效')) {
        return;
      }
      
      // 添加失效说明
      const deprecationNotice = `# 注意：本文件已失效

本文件已失效，有效的文件路径已更改到 ~/.workflow3.md

请删除此文件，并在用户主目录的 ~/.workflow3.md 文件中进行配置。

---

`;
      
      const updatedContent = deprecationNotice + content;
      fs.writeFileSync(legacyFilePath, updatedContent, 'utf-8');
      console.error(`📝 [workflow3] 已在旧文件添加失效说明: ${legacyFilePath}`);
    }
  } catch (error) {
    console.error(`⚠️ [workflow3] 处理旧文件时出错: ${error}`);
  }
}