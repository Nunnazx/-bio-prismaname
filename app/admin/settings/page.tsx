import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSettings } from "@/components/admin/admin-settings"
import { SystemStatus } from "@/components/admin/system-status"
import { BackupSystem } from "@/components/admin/backup-system"
import { getSystemSettings, getSystemStatus } from "@/app/actions/settings"
import { Settings, Database, Shield, Globe, Mail, Palette } from "lucide-react"

export const metadata = {
  title: "Settings | Admin Dashboard",
  description: "System settings and configuration",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function SettingsPage() {
  const settings = await getSystemSettings()
  const systemStatus = await getSystemStatus()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <div className="text-sm text-muted-foreground">
          System configuration and preferences
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.dbSize}</div>
            <p className="text-xs text-muted-foreground">
              {systemStatus.dbConnections} active connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.storageUsed}%</div>
            <p className="text-xs text-muted-foreground">
              {systemStatus.storageSize} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.lastBackup}</div>
            <p className="text-xs text-muted-foreground">
              Automated daily backups
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="site">
            <Globe className="mr-2 h-4 w-4" />
            Site Settings
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system">
            <Database className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic site configuration and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading settings...</div>}>
                <AdminSettings settings={settings} category="general" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Website information and metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading site settings...</div>}>
                <AdminSettings settings={settings} category="site" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                SMTP settings and email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading email settings...</div>}>
                <AdminSettings settings={settings} category="email" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Theme, colors, and visual preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading appearance settings...</div>}>
                <AdminSettings settings={settings} category="appearance" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Authentication, permissions, and security policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading security settings...</div>}>
                <AdminSettings settings={settings} category="security" />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Monitor system health and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading system status...</div>}>
                  <SystemStatus status={systemStatus} />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Management</CardTitle>
                <CardDescription>
                  Create and manage system backups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading backup system...</div>}>
                  <BackupSystem />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}