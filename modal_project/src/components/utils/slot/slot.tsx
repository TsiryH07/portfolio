import * as React from "react"
import { Slot as RadixSlot } from "@radix-ui/react-slot"

type SlotProps<ElementType extends React.ElementType = "div"> = {
  as?: ElementType
  asChild?: boolean
} & Omit<React.ComponentPropsWithoutRef<ElementType>, "as">

type SlotComponent = <ElementType extends React.ElementType = "div">(
  props: SlotProps<ElementType> & { ref?: React.Ref<React.ElementRef<ElementType>> }
) => React.ReactElement | null

export const Slot: SlotComponent = React.forwardRef(
  <ElementType extends React.ElementType = "div">(
    { as, asChild, ...props }: SlotProps<ElementType>,
    ref: React.Ref<React.ElementRef<ElementType>>
  ) => {
    const Component = asChild ? RadixSlot : (as ?? "div")
    return <Component ref={ref} {...props} />
  }
) as SlotComponent

Slot.displayName = "Slot"
