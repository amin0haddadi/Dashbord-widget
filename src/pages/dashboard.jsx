import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardWidget from 'components/dashboard/DashboardWidget'

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0)
  const [totalIcomes, setTotalIncomes] = useState(0)
  const [successfulOrdersCount, setSuccessfulOrdersCount] = useState(0)

  const getProducts = () => {
    axios.get('http://localhost:4000/products').then((res) => {
      const products = res.data
      setProductsCount(products.length)
    })
  }

  const getOrders = () => {
    axios.get('http://localhost:4000/orders').then((res) => {
      const orders = res.data
      const incomes = orders
        .filter((order) => order.status === 1)
        .reduce((total, order) => total + order.price, 0)
      setTotalIncomes(incomes)
      setSuccessfulOrdersCount(
        orders.filter((order) => order.status === 1).length,
      )
    })
  }

  useEffect(() => {
    getProducts()
    getOrders()
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد محصولات"
            icon="tshirt"
            value={productsCount}
            color="bg-primary"
            testId="products-count"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="درآمد کل"
            icon="coins"
            value={totalIcomes + ' تومان'}
            color="bg-warning"
            testId="total-incomes"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد سفارشات موفق"
            icon="shopping-cart"
            value={successfulOrdersCount}
            color="bg-danger"
            testId="successful-orders-count"
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
