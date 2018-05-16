#!/bin/bash

# 编译打包项目
npm run release

# 将传入的第一个参数作为项目名
project=$1

# 获取所有服务信息
list=$(pm2 list)

# 1.确认是否存在与webapartment服务有关的信息
hasServe=$(echo $list | grep -c $project)

# 如果步骤1成立
if [ $hasServe -eq 1 ]; then
  # 2.确认是否存在正在运行(online)的服务
  isOnline=$(echo $list | grep -c 'online')

  # 如果步骤2成立
  if [ $isOnline -eq 1 ]; then
    # 停止该服务
    pm2 stop $project
  fi

  # 删除该服务
  pm2 delete $project
fi

# 以新进程启动服务并以webapartment命名
pm2 start './dist/index.js' --name $project