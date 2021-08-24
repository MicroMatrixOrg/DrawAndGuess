// 创建shims-store.d.ts
import { Store } from '@/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
