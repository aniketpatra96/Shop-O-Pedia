import type { Product } from '@/@types/Product'
import { fireBaseDB } from '@/utility/firebaseConfig'
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  type DocumentData,
  DocumentReference,
  QuerySnapshot,
} from 'firebase/firestore'

const productCollection: CollectionReference<DocumentData, DocumentData> = collection(
  fireBaseDB,
  'products',
)

export default {
  async createProduct(product: Product): Promise<Product> {
    const docRef: DocumentReference = await addDoc(productCollection, product)
    return { id: docRef.id, ...product }
  },
  async getProduct(id: string): Promise<Partial<Product> | null> {
    const product = await getDoc(doc(productCollection, id))
    return product.exists() ? { id: product.id, ...product.data() } : null
  },
  async getAllProducts(): Promise<Partial<Product>[]> {
    const products: QuerySnapshot = await getDocs(productCollection)
    return products.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
  async updateProduct(id: string, product: Partial<Product>): Promise<Partial<Product>> {
    const productRef = doc(productCollection, id)
    await updateDoc(productRef, product)
    return { id, ...product }
  },
  async deleteProduct(id: string): Promise<void> {
    const productRef = doc(productCollection, id)
    await deleteDoc(productRef)
  },
}
