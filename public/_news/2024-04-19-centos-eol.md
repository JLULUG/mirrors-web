## CentOS 结束服务 (完成)

根据 CentOS 项目上游[安排](https://blog.centos.org/2023/04/end-dates-are-coming-for-centos-stream-8-and-centos-linux-7/)：

- CentOS Stream 8 将于 2024 年 5 月 31 日结束维护
- CentOS 7 将于 2024 年 6 月 30 日结束维护
- CentOS Linux 系列将在此后成为历史，软件仓库清空，Stream 9 及后续版本使用另外的软件仓库（未镜像）

因应以上情况，考虑到 CentOS 7 在校内各单位使用的广泛程度，本站作出如下安排：

- 6 月 29 日起，停止在同步中执行文件删除，仅允许新增和更新，暂时保留 CentOS 7 仓库的最后状态
- 8 月 1 日起，关闭互联网访问，仅允许校内访问
- 10 月 1 日起，删除 `centos` 仓库

建议仍在使用相关版本 CentOS 操作系统的师生和单位，尽快完成系统迁移，改用其他发行版：

- 迁移到由原 CentOS 项目的创始人之一发起的 Rocky Linux 项目（本站已镜像）
- 改用其他发行版如 Fedora 、Debian 、Arch Linux 等（本站均有镜像）
- 升级到 CentOS Stream 9 或更高版本（不推荐，本站未镜像）
- 迁移到 RedHat 企业版 Linux (RHEL)（商业软件，无镜像）

维护系统前请注意备份数据，愿您与自由软件度过愉快的时光。

2024 年 4 月 19 日

6 月 3 日更新：官方上游已移除 CentOS 8 Stream 存储库。

6 月 29 日更新：同步时已禁用文件删除。

8 月 1 日更新：已关闭互联网访问及 rsync 访问。

10 月 1 日更新：已移除 CentOS 仓库。

## CentOS Linux reached End of Life (Done)

According to the [official blog post](https://blog.centos.org/2023/04/end-dates-are-coming-for-centos-stream-8-and-centos-linux-7/),

- CentOS Stream 8 will reach End of Builds on May 31, 2024
- CentOS 7 will reach End of Life on Jun 30, 2024
- Future release starting from CentOS Stream 9 will use separate repository (not mirrored)

Considering the still large amount user of CentOS 7, we plan to,

- Stop removing files during syncing starting from Jun 29 to temporarily preserve the last CentOS 7 snapshot
- Stop public service on Aug 1, limiting access to campus only
- Remove `centos` repository on Oct 1

It's highly suggested to migrate now to another distro, e.g. Rocky Linux, Fedora, Debian or Arch Linux.

May you have a great time with free software.

Apr 19, 2024

Update Jun 3: The repository of CentOS 8 Stream has been removed from the official upstream.

Update Jun 29: Deletion during syncing is disabled.

Update Aug 1: Public service and rsync module have been turned off.

Update Oct 1: The repository of CentOS has been removed.

