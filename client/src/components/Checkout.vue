<script setup>
import { useCart } from '../store/cart'
import api from '../services/api'

const cart = useCart()

async function placeOrder(){
const res = await api.post('/orders', {
items: cart.items,
delivery_address: { address: 'Sample Street', city: 'Lagos' }
})
alert('Order placed!')
}
</script>