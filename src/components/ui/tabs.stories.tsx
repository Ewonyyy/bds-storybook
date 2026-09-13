import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bell, Settings, User } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

/**
 * docs/tabs.md 기준. variant: default / line / ghost. line variant는
 * `size`("36"|"40"|"44"|"48")로 반응형 타이포/높이가 바뀐다.
 */
const meta = {
  title: "Data Display/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
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
  ),
}

export const Variants: Story = {
  render: () => (
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
  ),
}

/** line variant의 36/40/44/48 사이즈를 비교합니다. */
export const LineSizes: Story = {
  render: () => (
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
  ),
}

export const Orientation: Story = {
  render: () => (
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
  ),
}

export const IconLabel: Story = {
  render: () => (
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
  ),
}

export const Disabled: Story = {
  render: () => (
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
  ),
}
