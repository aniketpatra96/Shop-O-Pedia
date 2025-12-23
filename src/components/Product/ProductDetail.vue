<template>
  <div class="modal" tabindex="-1" :id="`ProductDetailModal-${product.id}`">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-muted fs-5">Product Details</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="">
                <img
                  :src="product.image || `https://placehold.co/600x400`"
                  class="img-fluid rounded-3"
                  style="max-height: 400px"
                />
              </div>
            </div>

            <div class="col-md-6">
              <h2 class="text-success">{{ product.name }}</h2>
              <span v-if="product.isBestSeller" class="badge text-bg-warning p-2">
                <i class="bi bi-star-fill"></i> Bestseller
              </span>
              <span class="badge text-bg-warning p-2 mx-2">
                <i class="bi bi-tag-fill px-1"></i>
                <span>{{ product.category }}</span>
              </span>
              <p class="text-muted">{{ product.description }}</p>

              <div class="h3">
                <span
                  class="text-success"
                  :style="{ textDecoration: product.salePrice === null ? 'none' : 'line-through' }"
                >
                  ${{ product.price?.toFixed(0) }}
                  <span>/sqft</span>
                </span>
                &nbsp;
                <span class="text-danger" v-if="product.salePrice"
                  >${{ product.salePrice?.toFixed(0) }}/sqft
                </span>
              </div>

              <div class="">
                <div class="d-flex align-items-center gap-2 mb-2"></div>
                <div class="d-flex flex-wrap gap-2">
                  <span
                    v-for="(tag, index) in product.tags"
                    :key="index"
                    class="badge text-bg-secondary p-2"
                    >{{ tag }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <a href="mailto:hello@aniketronics.com" class="btn btn-success">
            <i class="bi bi-envelope-fill"></i>&nbsp; Contact us
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/@types/Product'

defineProps<{ product: Partial<Product> }>()
</script>
