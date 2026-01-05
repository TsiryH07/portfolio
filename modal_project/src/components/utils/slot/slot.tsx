import * as React from "react"
import { Slot as RadixSlot } from "@radix-ui/react-slot"

type SlotProps<ElementType extends React.ElementType = "div"> = {
  as?: ElementType
  asChild?: boolean
} & Omit<React.ComponentPropsWithRef<ElementType>, "as" | "asChild">

type SlotComponent = <ElementType extends React.ElementType = "div">(
  props: SlotProps<ElementType>
) => React.ReactElement | null

const Slot = React.forwardRef<Element, SlotProps<any>>(function SlotInner(
  { as, asChild, ...props }: SlotProps<any>,
  ref
) {
  const Component = asChild ? RadixSlot : (as ?? "div")
  return <Component ref={ref} {...props} />
}) as unknown as SlotComponent

;(Slot as React.ForwardRefExoticComponent<React.RefAttributes<unknown>>).displayName = "Slot"

export { Slot }
