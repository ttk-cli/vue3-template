export function useInit() {
  onBeforeMount(() => {
    console.log('onBeforeMount')
  })
  onMounted(() => {
    console.log('onMounted')
  })
  onBeforeUnmount(() => {
    console.log('onBeforeUnmount')
  })
  onUnmounted(() => {
    console.log('onUnmounted')
  })
  onBeforeUpdate(() => {
    console.log('onBeforeUpdate')
  })
  onUpdated(() => {
    console.log('onUpdated')
  })
  onErrorCaptured(() => {
    console.log('onErrorCaptured')
  })
}
