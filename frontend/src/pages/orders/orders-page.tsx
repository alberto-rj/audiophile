import { Link } from 'react-router-dom';

import { toMoney } from '@/libs/helpers';
import type { Order } from '@/libs/types';
import { APP_ROUTES } from '@/config/app-routes';

const orders: Order[] = [];

const OrdersPage = () => {
  return (
    <main>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul role='list'>
          {orders.map((order) => (
            <li key={order.id}>
              <article>
                <h2>Order #{order.id}</h2>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>{order.status}</p>
                <p>{toMoney(order.total)}</p>
                <Link to={`${APP_ROUTES.orders}/${order.id}`}>
                  View details
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default OrdersPage;
