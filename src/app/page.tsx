import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 p-6">
      <div className="w-full rounded-lg bg-card p-10 text-center shadow-neu">
        <h1 className="text-3xl font-bold">DiDung</h1>
        <p className="mt-2">Hỗ trợ quyết định khi ra ngoài tại TP. Hồ Chí Minh</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary">Bắt đầu</Button>
          <Button>Tìm hiểu thêm</Button>
        </div>
      </div>
    </main>
  );
}
