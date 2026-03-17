## Setting up React query TansStack and Trpc Client

> Create a file

src/provider/ReactQueryProvider.tsx

 <!-- Applying pagination -->

li

### TYping Background image style stypes

```ts
import type { CSSProperties } from "react";
```

<!--  -->

## Implementing Cart fetature

### Add to cart button

> Optimistic update

```ts
onMutate();
```

lets undrstand this

### So on order slug page i will apply polling for gettting the pending payments done

```ts
const { data, isLoading } = useQuery(
  trpc.order.getOrdderById.queryOptions(
    { orderId: Number(orderId) },
    {
      enabled: !!orderId,
      refetchInterval: (query) =>
        query.state.data?.paymentStatus === "PENDING" ? 2000 : false,
    },
  ),
);
```

command to move the file name is

```node
 git mv src/app/components/ProductDetails src/app/components/temp

```
