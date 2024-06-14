import "./style.css";

export default function Page({ params }: { params: { slug: string } }) {
    return <div>My Post: {params.slug}</div>
  }