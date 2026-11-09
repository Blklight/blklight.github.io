import { MediaView } from "@/components/media-view";

export default function MaskTesterPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Comparativo de Masks / Texturas
      </h1>
      Aplicando o granulado/noise do Photoshop só pelo nome
      <MediaView
        imageSrc="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
        pattern="noisy"
        className="w-150 h-64 rounded-xl"
      >
        <h2 className="p-4 text-white">Efeito Granulado</h2>
      </MediaView>
      <MediaView
        imageSrc="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
        pattern="noisy"
        parallax
      ></MediaView>
    </div>
  );
}
