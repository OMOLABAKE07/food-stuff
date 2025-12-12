<script setup>
import { useCart } from '../store/cart'
import api from '../services/api'
import toastr from '../utils/toastr'

const cart = useCart()

async function placeOrder(){
  const res = await api.post('/orders', {
    items: cart.items,
    delivery_address: { address: 'Sample Street', city: 'Lagos' }
  })
  toastr.success('Order placed!')
}
</script>