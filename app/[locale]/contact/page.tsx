"use client"

import { Building, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/use-language"
import { LanguageMeta } from "@/components/language-meta"

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <LanguageMeta pageName="contact" />

      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("contact.title")}</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">{t("contact.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.form.title")}</CardTitle>
              <CardDescription>{t("contact.form.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input id="name" placeholder={t("contact.form.namePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t("contact.form.company")}</Label>
                    <Input id="company" placeholder={t("contact.form.companyPlaceholder")} />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                    <Input id="phone" placeholder={t("contact.form.phonePlaceholder")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">{t("contact.form.inquiryType")}</Label>
                  <Select>
                    <SelectTrigger id="inquiry-type">
                      <SelectValue placeholder={t("contact.form.inquiryTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">{t("contact.form.inquiryTypes.product")}</SelectItem>
                      <SelectItem value="quote">{t("contact.form.inquiryTypes.quote")}</SelectItem>
                      <SelectItem value="sample">{t("contact.form.inquiryTypes.sample")}</SelectItem>
                      <SelectItem value="partnership">{t("contact.form.inquiryTypes.partnership")}</SelectItem>
                      <SelectItem value="other">{t("contact.form.inquiryTypes.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                  {t("contact.form.submitButton")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.info.title")}</CardTitle>
                <CardDescription>{t("contact.info.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("contact.info.company")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.info.cin")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("contact.info.address.title")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.info.address.line")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("contact.info.phone.title")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.info.phone.numbers")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("contact.info.email.title")}</h3>
                    <p className="text-sm text-gray-500">{t("contact.info.email.address")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("contact.hours.title")}</CardTitle>
                <CardDescription>{t("contact.hours.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("contact.hours.weekdays")}</span>
                    <span>{t("contact.hours.weekdayHours")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("contact.hours.saturday")}</span>
                    <span>{t("contact.hours.saturdayHours")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("contact.hours.sunday")}</span>
                    <span>{t("contact.hours.sundayHours")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
