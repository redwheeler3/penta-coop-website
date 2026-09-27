export async function retryOnce<T>(
  operation: () => Promise<T>,
  wait: () => Promise<void> = () => new Promise((resolve) => setTimeout(resolve, 1_000)),
): Promise<T> {
  try {
    return await operation();
  } catch {
    await wait();
    return operation();
  }
}
