"use client"

import { useState } from "react"
import { OptimizedImage } from "@/components/optimized-image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, Award, TrendingUp, BookOpen } from "lucide-react"

// Sample company stories
const companyStories = [
  {
    id: "journey",
    title: "Our Journey",
    icon: <Calendar className="h-5 w-5" />,
    content: [
      {
        year: "2018",
        title: "The Beginning",
        description: "AICMT was founded with a vision to create sustainable alternatives to conventional plastics.",
        image: "/stories/founding.jpg",
      },
      {
        year: "2019",
        title: "First Product Line",
        description: "Launched our first line of biodegradable shopping bags and food packaging solutions.",
        image: "/earth-friendly-shopping.png",
      },
      {
        year: "2020",
        title: "Expansion & Growth",
        description: "Expanded our production capacity and introduced new product categories.",
        image: "/sustainable-factory-exterior.png",
      },
      {
        year: "2021",
        title: "Certifications & Recognition",
        description: "Received CPCB certification and other industry recognitions for our products.",
        image: "/green-leaf-certificate.png",
      },
      {
        year: "2022",
        title: "Innovation & Research",
        description: "Established dedicated R&D facility to develop next-generation biodegradable materials.",
        image: "/biodegradable-testing.png",
      },
      {
        year: "2023",
        title: "Going Global",
        description: "Began exporting our products to international markets and formed strategic partnerships.",
        image: "/celebrating-success.png",
      },
    ],
  },
  {
    id: "team",
    title: "Our Team",
    icon: <Users className="h-5 w-5" />,
    content: [
      {
        name: "Leadership",
        description:
          "Our experienced leadership team brings decades of combined expertise in materials science, manufacturing, and sustainability.",
        image: "/confident-leader.png",
      },
      {
        name: "Research & Development",
        description: "Our R&D team constantly innovates to improve our products and develop new sustainable solutions.",
        image: "/confident-professional.png",
      },
      {
        name: "Production",
        description:
          "Our skilled production team ensures consistent quality and efficiency in all our manufacturing processes.",
        image: "/confident-indian-professional.png",
      },
      {
        name: "Quality Control",
        description: "Our dedicated quality control team maintains the highest standards for all our products.",
        image: "/biodegradable-testing.png",
      },
    ],
  },
  {
    id: "achievements",
    title: "Achievements",
    icon: <Award className="h-5 w-5" />,
    content: [
      {
        title: "CPCB Certification",
        description: "Received Central Pollution Control Board certification for our compostable plastic products.",
        image: "/green-leaf-certificate.png",
        year: "2021",
      },
      {
        title: "Sustainability Excellence Award",
        description:
          "Recognized for our contribution to reducing plastic pollution and promoting sustainable alternatives.",
        image: "/celebrating-success.png",
        year: "2022",
      },
      {
        title: "MSME ZED Bronze Certification",
        description: "Achieved Bronze certification under the Zero Defect Zero Effect quality model.",
        image: "/stories/msme-award.jpg",
        year: "2022",
      },
      {
        title: "ISO 17088:2021 Compliance",
        description: "Our products meet international standards for compostable plastics.",
        image: "/biodegradable-testing.png",
        year: "2023",
      },
    ],
  },
  {
    id: "impact",
    title: "Our Impact",
    icon: <TrendingUp className="h-5 w-5" />,
    content: [
      {
        title: "Environmental Impact",
        description:
          "Our products have helped prevent thousands of tons of conventional plastic waste from entering the environment.",
        image: "/planting-for-the-future.png",
        stats: "500+ tons of plastic waste prevented",
      },
      {
        title: "Community Engagement",
        description:
          "We actively participate in community education programs about plastic pollution and sustainable alternatives.",
        image: "/plastic-ban-awareness.png",
        stats: "50+ awareness workshops conducted",
      },
      {
        title: "Economic Impact",
        description: "We've created sustainable employment opportunities and supported the local economy.",
        image: "/interconnected-sustainable-growth.png",
        stats: "100+ jobs created",
      },
      {
        title: "Industry Transformation",
        description:
          "We're helping businesses transition to sustainable packaging solutions and reduce their environmental footprint.",
        image: "/sustainable-retail-display.png",
        stats: "200+ businesses transitioned to sustainable packaging",
      },
    ],
  },
]

export function OurStories() {
  const [activeTab, setActiveTab] = useState("journey")

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-6 w-6 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">Our Stories</h2>
        </div>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Discover the journey, people, and impact behind our sustainable plastic alternatives
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full" aria-label="Company story categories">
          {companyStories.map((story) => (
            <TabsTrigger key={story.id} value={story.id} className="flex items-center gap-2">
              {story.icon}
              {story.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {companyStories.map((story) => (
          <TabsContent key={story.id} value={story.id} className="mt-6">
            {story.id === "journey" && (
              <div className="relative">
                <div className="absolute left-[25px] top-8 bottom-8 w-0.5 bg-green-200 hidden md:block"></div>
                <div className="space-y-8">
                  {story.content.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex flex-row md:flex-col items-center md:items-start gap-4 mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold z-10">
                          {item.year}
                        </div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                      <div className="md:w-3/4">
                        <Card>
                          <CardContent className="p-0">
                            <div className="grid md:grid-cols-2">
                              <div className="aspect-video md:aspect-square overflow-hidden">
                                <OptimizedImage
                                  src={item.image}
                                  alt={`${item.year}: ${item.title} - ${item.description}`}
                                  width={400}
                                  height={400}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-6 flex items-center">
                                <p className="text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {story.id === "team" && (
              <div className="grid md:grid-cols-2 gap-6">
                {story.content.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="aspect-video overflow-hidden">
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {story.id === "achievements" && (
              <div className="grid md:grid-cols-2 gap-6">
                {story.content.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="grid grid-cols-3">
                        <div className="col-span-1 aspect-square overflow-hidden">
                          <OptimizedImage
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="col-span-2 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">{item.year}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {story.id === "impact" && (
              <div className="grid md:grid-cols-2 gap-6">
                {story.content.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                      <div className="aspect-video overflow-hidden relative">
                        <OptimizedImage
                          src={item.image}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="font-bold text-xl">{item.title}</h3>
                            <div className="mt-2 inline-block bg-green-600 px-3 py-1 rounded text-sm font-medium">
                              {item.stats}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
