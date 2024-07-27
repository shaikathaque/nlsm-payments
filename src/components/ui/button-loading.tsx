import { Loader2 } from "lucide-react"

import { Button } from "./button"

type Props = {
  text: string;
}
export default function ButtonLoading({ text }: Props) {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </Button>
  )
}
