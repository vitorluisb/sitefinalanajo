import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useTranslatedImprovements } from '@/data/improvements';

const NewsSection = () => {
  const { t } = useTranslation()
  const improvements = useTranslatedImprovements();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<
    null | { id: number; title: string; description: string; image: string; images: { src: string; alt: string }[] }
  >(null)

  const openModal = (
    item: { id: number; title: string; description: string; image: string; images: { src: string; alt: string }[] }
  ) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">{t('news.title')}</h2>
        
        {/* Avisos Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-blue-700 mb-8 flex items-center justify-center">
            <span className="mr-3 text-yellow-500">🔔</span> {t('news.announcements')}
          </h3>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            Card 1
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img src="/placeholder.svg" alt="Aviso 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Título do Aviso 1</h4>
                <p className="text-gray-600">Breve descrição do aviso. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            Card 2
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img src="/placeholder.svg" alt="Aviso 2" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Título do Aviso 2</h4>
                <p className="text-gray-600">Breve descrição do aviso. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            Card 3
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img src="/placeholder.svg" alt="Aviso 3" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">Título do Aviso 3</h4>
                <p className="text-gray-600">Breve descrição do aviso. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Melhorias Section */}
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-8 flex items-center justify-center">
            {t('news.improvements')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {improvements.map((imp) => (
              <div
                key={imp.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Always visible cover image */}
                <div className="relative h-48">
                  <img
                    src={imp.image}
                    alt={imp.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openModal(imp)}
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{imp.title}</h4>
                  <p className="text-gray-600 mb-4">{imp.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Carousel */}
          <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="max-w-6xl p-0">
              {selectedItem && (
                <ProjectCarousel
                  project={{
                    id: selectedItem.id,
                    title: selectedItem.title,
                    category: 'Cultura',
                    description: selectedItem.description,
                    participants: 0,
                    location: '—',
                    schedule: '—',
                    duration: '—',
                    instructor: '—',
                    results: [],
                    requirements: '—',
                  }}
                  images={selectedItem.images}
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  photosOnly
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;