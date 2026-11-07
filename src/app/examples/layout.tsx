import { RequestTime } from "@/components/request-time";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RequestTime>{children}</RequestTime>;
}
