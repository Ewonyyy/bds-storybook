import { Bell, Settings, User } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        Variant (default / line / ghost)
      </h2>
      <div className="flex flex-wrap items-start gap-8">
        <Tabs defaultValue="account" className="w-64">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>

        <Tabs defaultValue="account" className="w-64">
          <TabsList variant="line">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>

        <Tabs defaultValue="account" className="w-64">
          <TabsList variant="ghost">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Line — Size (36 / 40 / 44 / 48, Figma 실측)
      </h3>
      <div className="flex flex-wrap items-start gap-8">
        {(["36", "40", "44", "48"] as const).map((size) => (
          <Tabs defaultValue="account" className="w-64" key={size}>
            <TabsList variant="line" size={size}>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              계정 정보를 확인하고 수정합니다.
            </TabsContent>
            <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
            <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
          </Tabs>
        ))}
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Orientation (horizontal / vertical)
      </h3>
      <div className="flex flex-wrap items-start gap-8">
        <Tabs defaultValue="account" orientation="horizontal" className="w-64">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
        </Tabs>

        <Tabs
          defaultValue="account"
          orientation="vertical"
          className="w-80 flex-row"
        >
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Icon + Label (Default / Line — size별 아이콘·gap 규칙 비교)
      </h3>
      <div className="flex flex-wrap items-start gap-8">
        <Tabs defaultValue="account" className="w-72">
          <TabsList>
            <TabsTrigger value="account">
              <User data-icon="inline-start" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell data-icon="inline-start" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings data-icon="inline-start" />
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="notifications">알림 수신 여부를 설정합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>

        {(
          [
            { size: "36", width: "w-72" },
            { size: "40", width: "w-80" },
            { size: "44", width: "w-96" },
            { size: "48", width: "w-[28rem]" },
          ] as const
        ).map(({ size, width }) => (
          <Tabs defaultValue="account" className={width} key={size}>
            <TabsList variant="line" size={size}>
              <TabsTrigger value="account">
                <User data-icon="inline-start" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell data-icon="inline-start" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings data-icon="inline-start" />
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              계정 정보를 확인하고 수정합니다.
            </TabsContent>
            <TabsContent value="notifications">
              알림 수신 여부를 설정합니다.
            </TabsContent>
            <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
          </Tabs>
        ))}
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">Disabled</h3>
      <div className="flex flex-wrap items-start gap-8">
        <Tabs defaultValue="account" className="w-64">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password" disabled>
              Password
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>

        <Tabs defaultValue="account" className="w-64">
          <TabsList variant="line">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password" disabled>
              Password
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>

        <Tabs defaultValue="account" className="w-64">
          <TabsList variant="ghost">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password" disabled>
              Password
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">계정 정보를 확인하고 수정합니다.</TabsContent>
          <TabsContent value="password">비밀번호를 변경합니다.</TabsContent>
          <TabsContent value="settings">알림, 언어 등 환경설정입니다.</TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
