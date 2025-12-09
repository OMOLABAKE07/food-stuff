<script setup>
import axios from 'axios'
import { useCart } from '../store/cart'

const cart = useCart()

async function placeOrder(){
const res = await axios.post('/orders', {
items: cart.items,
delivery_address: { address: 'Sample Street', city: 'Lagos' }
})
alert('Order placed!')
}
</script>