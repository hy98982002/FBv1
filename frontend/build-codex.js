#!/usr/bin/env node

// 简化的构建脚本，适用于 Codex 环境
// 跳过 TypeScript 类型检查，直接进行构建

const { spawn } = require('child_process')
const path = require('path')

console.log('🚀 开始构建 Vue 项目 (Codex 环境)...')
console.log('⚠️  跳过 TypeScript 类型检查以加快构建速度')

// 直接运行 vite build
const buildProcess = spawn('npx', ['vite', 'build'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
})

buildProcess.on('close', code => {
  if (code === 0) {
    console.log('✅ 构建成功完成！')
    console.log('📁 构建文件位于 dist/ 目录')
  } else {
    console.error('❌ 构建失败，退出码:', code)
    process.exit(code)
  }
})

buildProcess.on('error', err => {
  console.error('❌ 构建过程出错:', err.message)
  process.exit(1)
})
