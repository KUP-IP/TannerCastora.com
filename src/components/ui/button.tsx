import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button (TCX.2 themed) — sizes scaled up for the editorial bar; calm motion.
 * Default/outline tuned for warm-paper light theme. CtaLink reuses these
 * variants for anchor-as-button (base-ui Button has no asChild).
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-medium whitespace-nowrap outline-none select-none transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-[color-mix(in_oklch,var(--primary),white_10%)] hover:shadow-md dark:hover:bg-[color-mix(in_oklch,var(--primary),black_10%)]",
        outline:
          "border-border bg-background/60 text-foreground hover:bg-secondary hover:border-foreground/20 aria-expanded:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] aria-expanded:bg-secondary",
        ghost:
          "hover:bg-secondary hover:text-foreground aria-expanded:bg-secondary dark:hover:bg-muted/50",
        brand:
          "bg-brand text-brand-foreground shadow-sm hover:bg-[color-mix(in_oklch,var(--brand),black_8%)] hover:shadow-md",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 rounded-md px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-10 gap-2 px-4 text-sm",
        lg: "h-12 gap-2 px-6 text-[0.95rem] tracking-tight [&_svg:not([class*='size-'])]:size-[1.05rem]",
        icon: "size-10",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
