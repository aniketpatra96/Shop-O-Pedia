<template>
  <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form @submit.prevent="handleSubmit">
          <div class="h2 text-center text-success">
            {{ productIdForUpdate ? 'Update' : 'Create' }} Product
          </div>
          <hr />
          <div v-if="errorList.length > 0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="error in errorList" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input v-model.trim="productObj.name" type="text" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea
              v-model.trim="productObj.description"
              type="text"
              class="form-control"
            ></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input v-model.number="productObj.price" type="number" class="form-control" />
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input v-model.number="productObj.salePrice" type="number" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-separated)</span>
            <input
              v-model.trim="productObj.tags"
              type="text"
              class="form-control"
              placeholder="e.g., modern, classic, luxury"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input
              v-model="productObj.isBestSeller"
              class="form-check-input"
              type="checkbox"
              role="switch"
            />

            <label class="form-check-label" for="bestseller"> Bestseller </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select v-model="productObj.category" class="form-select">
              <option value="" default>-- Select a category --</option>
              <option v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input
                type="file"
                class="form-control"
                @change="handleImageUpload"
                :disabled="isImageLoading"
              />
            </div>
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading || isImageLoading">
              <span
                v-if="loading || isImageLoading"
                class="spinner-border spinner-border-sm me-2"
              ></span
              >Submit
            </button>
            <router-link
              :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }"
              class="btn btn-secondary m-2 w-25"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="productObj.image || `https://placehold.co/600x400`"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, ProductFormData } from '@/@types/Product'
import { ref, reactive, type Ref, type Reactive, onMounted } from 'vue'
import { PRODUCT_CATEGORIES } from '@/constants/AppConstants'
import { useSwal } from '@/composibles/useSwal'
import productService from '@/services/ProductService'
import {
  useRouter,
  type Router,
  RouterLink,
  useRoute,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/RouteNames'
import { uploadToCloudinary } from '@/utility/cloudinary'
const router: Router = useRouter()
const route: RouteLocationNormalizedLoadedGeneric = useRoute()
let productIdForUpdate: string | string[] | undefined = route.params.id
const { showSuccess } = useSwal()
const loading: Ref<boolean> = ref(false)
const isImageLoading: Ref<boolean> = ref(false)
const errorList: Reactive<string[]> = reactive([])
const productObj: ProductFormData = reactive({
  name: '',
  description: '',
  price: 0,
  salePrice: 0,
  tags: '',
  isBestSeller: false,
  category: '',
  image: 'https://placehold.co/600x400',
})

async function handleSubmit() {
  if (handleValidation()) return
  if (productIdForUpdate) {
    const productData: Product = {
      ...productObj,
      price: Number(productObj.price),
      salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
      tags:
        productObj.tags.length > 0
          ? productObj.tags?.split(',').map((tag: string) => tag.trim())
          : [],
      isBestSeller: Boolean(productObj.isBestSeller),
    }
    await productService.updateProduct(productIdForUpdate as string, productData)
    showSuccess('Product updated successfully')
    router.push({ name: APP_ROUTE_NAMES.PRODUCT_LIST })
    return
  }
  try {
    loading.value = true
    const productData: Product = {
      ...productObj,
      price: Number(productObj.price),
      salePrice: productObj.salePrice ? Number(productObj.salePrice) : null,
      tags:
        productObj.tags.length > 0
          ? productObj.tags?.split(',').map((tag: string) => tag.trim())
          : [],
      isBestSeller: Boolean(productObj.isBestSeller),
    }
    await productService.createProduct(productData)
    showSuccess('Product created successfully')
    router.push({ name: APP_ROUTE_NAMES.PRODUCT_LIST })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function handleValidation() {
  errorList.length = 0
  if (!productObj.name) errorList.push('Name is required')
  if (!productObj.description) errorList.push('Description is required')
  if (!productObj.price) errorList.push('Price is required')
  if (!productObj.category) errorList.push('Category is required')
  if (productObj.name.length < 3) errorList.push('Name must be at least 3 characters')
  if (productObj.price <= 0) errorList.push('Price must be greater than 0')
  return errorList.length > 0
}

onMounted(async () => {
  if (!productIdForUpdate) {
    productIdForUpdate = undefined
    Object.assign(productObj, {
      name: '',
      description: '',
      price: 0,
      salePrice: 0,
      tags: '',
      isBestSeller: false,
      category: '',
      image: '',
    })
    return
  }
  loading.value = true
  try {
    const product: Partial<Product> | null = await productService.getProduct(
      productIdForUpdate as string,
    )
    Object.assign(productObj, { ...product, tags: product?.tags?.join(',') })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

async function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  isImageLoading.value = true
  try {
    const imageUrl: string = await uploadToCloudinary(file)
    productObj.image = imageUrl
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    isImageLoading.value = false
  }
}
</script>
