// 定义函数类型别名，让代码更清晰
type RequestFunction = (url: string, options?: RequestInit) => Promise<Response>;

/**
 * 创建一个并发请求限制器
 * @param limit 最大并发数
 * @returns 返回一个 request 函数，该函数与 fetch 类似，但受并发数限制
 */
function createRequest(limit: number): RequestFunction {
  const taskQueue: Array<() => Promise<Response>> = []; // 任务队列
  let runningCount = 0; // 当前正在进行的请求数

  // 核心调度器函数
  const run = () => {
    // 只要任务队列不为空，并且当前并发数小于限制
    if (taskQueue.length > 0 && runningCount < limit) {
      runningCount++;
      const task = taskQueue.shift(); // 从队列中取出一个任务
      if (task) {
        task().finally(() => {
          runningCount--; // 任务完成后，减少并发计数
          run(); // 递归调用 run()，尝试启动下一个任务
        });
      }
    }
  };

  /**
   * 返回的 request 函数，用于发起请求
   * @param url 请求 URL
   * @param options 请求配置
   */
  const request = (url: string, options?: RequestInit): Promise<Response> => {
    return new Promise((resolve, reject) => {
      // 创建一个包裹原始 fetch 的任务函数
      const task = () => fetch(url, options)
        .then(response => {
          resolve(response);
          return response;
        })
        .catch(error => {
          reject(error);
          throw error;
        });

      taskQueue.push(task); // 将任务推入队列
      run(); // 尝试运行任务
    });
  };

  return request;
}

// --- 使用示例 ---

// 创建一个最大并发数为 3 的请求函数
const requestWithLimit = createRequest(3);

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
  'https://jsonplaceholder.typicode.com/posts/4',
  'https://jsonplaceholder.typicode.com/posts/5',
];

urls.forEach((url, index) => {
  requestWithLimit(url)
    .then(response => response.json())
    .then(data => {
      console.log(`请求 ${index + 1} 成功，数据:`, data);
    })
    .catch(error => {
      console.error(`请求 ${index + 1} 失败:`, error);
    });
});