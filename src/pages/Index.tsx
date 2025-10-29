import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    price: 1200,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/73aad4c4-647e-4783-b783-844231a38f92.jpg"
  },
  {
    id: 2,
    title: "Лунная тропа",
    collection: "Ночной лес",
    price: 1500,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/6474dbd8-39a7-4d87-bc10-447302e6d99b.jpg"
  },
  {
    id: 3,
    title: "Утреннее волшебство",
    collection: "Дикая природа",
    price: 1400,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/6e4da20a-6b16-43d5-855c-ad293a1bbd4b.jpg"
  },
  {
    id: 4,
    title: "Папоротниковая чаща",
    collection: "Дикая природа",
    price: 1450,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/abf63dbc-325c-4b90-9495-339a7d1ea93f.jpg"
  },
  {
    id: 5,
    title: "Осенняя тропа",
    collection: "Туманный лес",
    price: 1350,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/497e850a-b745-4654-b246-ea98e32a20ee.jpg"
  },
  {
    id: 6,
    title: "Дождливый бор",
    collection: "Ночной лес",
    price: 1550,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/e8092ccf-bed0-4a30-a3d9-a3ce47d5ffce.jpg"
  },
  {
    id: 7,
    title: "Берёзовая роща",
    collection: "Туманный лес",
    price: 1300,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/9511a977-d7d7-4384-9c80-7e189094b6ea.jpg"
  },
  {
    id: 8,
    title: "Древний бор",
    collection: "Дикая природа",
    price: 1750,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/bf6e1eb9-357b-4392-84b3-942f98d9a070.jpg"
  },
  {
    id: 9,
    title: "Зимнее безмолвие",
    collection: "Ночной лес",
    price: 1550,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/ea02c5d8-8a49-4e3a-a19e-e943b9b5099a.jpg"
  },
  {
    id: 10,
    title: "Зачарованный лес",
    collection: "Дикая природа",
    price: 1425,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/abf63dbc-325c-4b90-9495-339a7d1ea93f.jpg"
  },
  {
    id: 11,
    title: "Золотая осень",
    collection: "Туманный лес",
    price: 1325,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/497e850a-b745-4654-b246-ea98e32a20ee.jpg"
  },
  {
    id: 12,
    title: "Штормовой лес",
    collection: "Ночной лес",
    price: 1650,
    image: "https://cdn.poehali.dev/projects/6102bceb-076e-4a20-830f-c0cb8ee1da16/files/e8092ccf-bed0-4a30-a3d9-a3ce47d5ffce.jpg"
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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let filteredPhotos = selectedCollection
    ? photos.filter(p => p.collection === selectedCollection)
    : photos;

  if (priceRange === 'low') {
    filteredPhotos = filteredPhotos.filter(p => p.price < 1400);
  } else if (priceRange === 'medium') {
    filteredPhotos = filteredPhotos.filter(p => p.price >= 1400 && p.price <= 1500);
  } else if (priceRange === 'high') {
    filteredPhotos = filteredPhotos.filter(p => p.price > 1500);
  }

  if (sortBy === 'price-asc') {
    filteredPhotos = [...filteredPhotos].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredPhotos = [...filteredPhotos].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredPhotos = [...filteredPhotos].sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => setActiveSection('главная')}>
            Forest Gallery
          </h1>
          <div className="flex gap-6">
            {['Главная', 'Галерея', 'Коллекции', 'О проекте'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item.toLowerCase());
                  const sectionId = item.toLowerCase().replace(' ', '-');
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`text-foreground/80 hover:text-primary transition-colors ${
                  activeSection === item.toLowerCase() ? 'text-primary font-semibold' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-6xl font-bold mb-6 text-foreground">
            Тёмные лесные пейзажи
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Коллекция премиальных фотографий таинственных лесов. 
            Каждый кадр — это путешествие в глубины природы.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                setActiveSection('галерея');
                document.getElementById('галерея')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Icon name="Image" className="mr-2" size={20} />
              Смотреть галерею
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                setActiveSection('коллекции');
                document.getElementById('коллекции')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Icon name="Layers" className="mr-2" size={20} />
              Коллекции
            </Button>
          </div>
        </div>
      </section>

      <section id="коллекции" className="py-16 px-4 bg-card">
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
                  document.getElementById('галерея')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

      <section id="галерея" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <h3 className="text-4xl font-bold text-foreground">
              {selectedCollection || 'Галерея'}
            </h3>
            <div className="flex gap-3 flex-wrap items-center">
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
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все цены</SelectItem>
                  <SelectItem value="low">До 1400 ₽</SelectItem>
                  <SelectItem value="medium">1400 - 1500 ₽</SelectItem>
                  <SelectItem value="high">От 1500 ₽</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-muted-foreground">
              Найдено: {filteredPhotos.length} фото
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, idx) => (
              <Card
                key={photo.id}
                className="overflow-hidden group cursor-pointer bg-card border-border hover:border-primary transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => setSelectedPhoto(photo)}
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
                          <Icon name="ZoomIn" size={16} />
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

      <section id="о проекте" className="py-20 px-4 bg-card">
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

      {showScrollTop && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all z-50"
          size="icon"
        >
          <Icon name="ArrowUp" size={24} />
        </Button>
      )}

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl p-0 bg-background border-border">
          {selectedPhoto && (
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary">
                    {selectedPhoto.collection}
                  </Badge>
                  <h3 className="text-4xl font-bold mb-4 text-foreground">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    Профессиональная фотография высокого разрешения. 
                    Подходит для печати и коммерческого использования.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Icon name="Image" size={20} className="text-primary" />
                      <span className="text-foreground">Высокое разрешение</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Download" size={20} className="text-primary" />
                      <span className="text-foreground">Цифровая загрузка</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="FileCheck" size={20} className="text-primary" />
                      <span className="text-foreground">Лицензия на использование</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-primary">
                      {selectedPhoto.price} ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;