import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Photo {
  id: number;
  title: string;
  collection: string;
  price: number;
  image: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: "Туманный рассвет",
    collection: "Туманный лес",
    price: 2500,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/73aad4c4-647e-4783-b783-844231a38f92.jpg"
  },
  {
    id: 2,
    title: "Лунная тропа",
    collection: "Ночной лес",
    price: 3000,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/6474dbd8-39a7-4d87-bc10-447302e6d99b.jpg"
  },
  {
    id: 3,
    title: "Утреннее волшебство",
    collection: "Дикая природа",
    price: 2800,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/6e4da20a-6b16-43d5-855c-ad293a1bbd4b.jpg"
  },
  {
    id: 4,
    title: "Сумеречная чаща",
    collection: "Туманный лес",
    price: 2500,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/73aad4c4-647e-4783-b783-844231a38f92.jpg"
  },
  {
    id: 5,
    title: "Таинственная глубина",
    collection: "Ночной лес",
    price: 3200,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/6474dbd8-39a7-4d87-bc10-447302e6d99b.jpg"
  },
  {
    id: 6,
    title: "Свет сквозь кроны",
    collection: "Дикая природа",
    price: 2700,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/6e4da20a-6b16-43d5-855c-ad293a1bbd4b.jpg"
  }
];

const collections = [
  { name: "Туманный лес", count: 12, icon: "Cloud" },
  { name: "Ночной лес", count: 8, icon: "Moon" },
  { name: "Дикая природа", count: 15, icon: "TreePine" }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const filteredPhotos = selectedCollection
    ? photos.filter(p => p.collection === selectedCollection)
    : photos;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Forest Gallery</h1>
          <div className="flex gap-6">
            {['Главная', 'Галерея', 'Коллекции', 'О проекте'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-6xl font-bold mb-6 text-foreground">
            Тёмные лесные пейзажи
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Коллекция премиальных фотографий таинственных лесов. 
            Каждый кадр — это путешествие в глубины природы.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Image" className="mr-2" size={20} />
              Смотреть галерею
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="Layers" className="mr-2" size={20} />
              Коллекции
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center text-foreground">
            Тематические коллекции
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((collection, idx) => (
              <Card
                key={collection.name}
                className="p-8 hover:scale-105 transition-transform cursor-pointer bg-secondary border-border animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => {
                  setSelectedCollection(collection.name);
                  setActiveSection('галерея');
                }}
              >
                <Icon name={collection.icon} size={48} className="text-primary mb-4" />
                <h4 className="text-2xl font-semibold mb-2 text-foreground">
                  {collection.name}
                </h4>
                <p className="text-muted-foreground">
                  {collection.count} фотографий
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-4xl font-bold text-foreground">
              {selectedCollection || 'Галерея'}
            </h3>
            {selectedCollection && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedCollection(null)}
              >
                <Icon name="X" className="mr-2" size={16} />
                Показать все
              </Button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, idx) => (
              <Card
                key={photo.id}
                className="overflow-hidden group cursor-pointer bg-card border-border hover:border-primary transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <Badge className="mb-2 bg-primary/20 text-primary border-primary">
                        {photo.collection}
                      </Badge>
                      <h4 className="text-2xl font-semibold mb-2 text-foreground">
                        {photo.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {photo.price} ₽
                        </span>
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          <Icon name="ShoppingCart" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold mb-8 text-center text-foreground">
            О проекте
          </h3>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Forest Gallery — это уникальная коллекция фотографий тёмных лесных пейзажей, 
              созданная профессиональным фотографом с многолетним опытом работы в жанре 
              пейзажной съёмки.
            </p>
            <p>
              Каждая фотография в коллекции — результат долгих часов ожидания идеального 
              света, момента и атмосферы. Мы запечатлеваем таинственную красоту природы, 
              которую редко можно увидеть в повседневной жизни.
            </p>
            <p>
              Все снимки доступны для покупки в высоком разрешении и могут быть использованы 
              как для личных, так и для коммерческих целей.
            </p>
          </div>
          <div className="mt-12 flex gap-4 justify-center">
            <Button variant="outline" size="lg">
              <Icon name="Mail" className="mr-2" size={20} />
              Связаться
            </Button>
            <Button variant="outline" size="lg">
              <Icon name="Instagram" className="mr-2" size={20} />
              Instagram
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Forest Gallery. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
