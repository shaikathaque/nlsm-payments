import { Loader2 } from "lucide-react"

import { Button } from "./button"

type Props = {
  text: string;
}
export default function ButtonLoading({ text }: Props) {
  return (
    <Button disabled>
      {text}
      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
    </Button>
  )
}
