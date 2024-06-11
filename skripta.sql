USE [intellecta]
GO
/****** Object:  Schema [HangFire]    Script Date: 11.6.2024. 17:44:56 ******/
CREATE SCHEMA [HangFire]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[CourseId] [int] IDENTITY(1,1) NOT NULL,
	[CreatorId] [int] NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Subtitle] [nvarchar](max) NOT NULL,
	[DurationInWeeks] [int] NOT NULL,
	[WeeklyHours] [int] NOT NULL,
	[Highlights] [nvarchar](max) NOT NULL,
	[Category] [nvarchar](max) NOT NULL,
	[CourseMark] [real] NOT NULL,
	[Approved] [bit] NOT NULL,
	[Price] [real] NOT NULL,
 CONSTRAINT [PK_Courses] PRIMARY KEY CLUSTERED 
(
	[CourseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CourseUser]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CourseUser](
	[CoursesCourseId] [int] NOT NULL,
	[UsersId] [int] NOT NULL,
 CONSTRAINT [PK_CourseUser] PRIMARY KEY CLUSTERED 
(
	[CoursesCourseId] ASC,
	[UsersId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materials]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Materials](
	[ContentId] [int] IDENTITY(1,1) NOT NULL,
	[CourseId] [int] NOT NULL,
	[VideoFile] [nvarchar](max) NOT NULL,
	[TxtFile] [nvarchar](max) NOT NULL,
	[WeekNumber] [int] NOT NULL,
	[FileOrder] [int] NOT NULL,
 CONSTRAINT [PK_Materials] PRIMARY KEY CLUSTERED 
(
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[CourseId] [int] NOT NULL,
	[ReviewText] [nvarchar](max) NOT NULL,
	[Mark] [int] NOT NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Statistics]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Statistics](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[CourseId] [int] NULL,
	[MaterialId] [int] NULL,
	[Completed] [bit] NOT NULL,
	[Week] [int] NOT NULL,
 CONSTRAINT [PK_Statistics] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NOT NULL,
	[PasswordHash] [varbinary](max) NOT NULL,
	[PasswordSalt] [varbinary](max) NOT NULL,
	[DateOfBirth] [datetime2](7) NOT NULL,
	[UserType] [nvarchar](max) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Approved] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[AggregatedCounter]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[AggregatedCounter](
	[Key] [nvarchar](100) NOT NULL,
	[Value] [bigint] NOT NULL,
	[ExpireAt] [datetime] NULL,
 CONSTRAINT [PK_HangFire_CounterAggregated] PRIMARY KEY CLUSTERED 
(
	[Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[Counter]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[Counter](
	[Key] [nvarchar](100) NOT NULL,
	[Value] [int] NOT NULL,
	[ExpireAt] [datetime] NULL,
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_HangFire_Counter] PRIMARY KEY CLUSTERED 
(
	[Key] ASC,
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[Hash]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[Hash](
	[Key] [nvarchar](100) NOT NULL,
	[Field] [nvarchar](100) NOT NULL,
	[Value] [nvarchar](max) NULL,
	[ExpireAt] [datetime2](7) NULL,
 CONSTRAINT [PK_HangFire_Hash] PRIMARY KEY CLUSTERED 
(
	[Key] ASC,
	[Field] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = ON, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[Job]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[Job](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[StateId] [bigint] NULL,
	[StateName] [nvarchar](20) NULL,
	[InvocationData] [nvarchar](max) NOT NULL,
	[Arguments] [nvarchar](max) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[ExpireAt] [datetime] NULL,
 CONSTRAINT [PK_HangFire_Job] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[JobParameter]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[JobParameter](
	[JobId] [bigint] NOT NULL,
	[Name] [nvarchar](40) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_HangFire_JobParameter] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[JobQueue]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[JobQueue](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[JobId] [bigint] NOT NULL,
	[Queue] [nvarchar](50) NOT NULL,
	[FetchedAt] [datetime] NULL,
 CONSTRAINT [PK_HangFire_JobQueue] PRIMARY KEY CLUSTERED 
(
	[Queue] ASC,
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[List]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[List](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Key] [nvarchar](100) NOT NULL,
	[Value] [nvarchar](max) NULL,
	[ExpireAt] [datetime] NULL,
 CONSTRAINT [PK_HangFire_List] PRIMARY KEY CLUSTERED 
(
	[Key] ASC,
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[Schema]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[Schema](
	[Version] [int] NOT NULL,
 CONSTRAINT [PK_HangFire_Schema] PRIMARY KEY CLUSTERED 
(
	[Version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[Server]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[Server](
	[Id] [nvarchar](200) NOT NULL,
	[Data] [nvarchar](max) NULL,
	[LastHeartbeat] [datetime] NOT NULL,
 CONSTRAINT [PK_HangFire_Server] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[Set]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[Set](
	[Key] [nvarchar](100) NOT NULL,
	[Score] [float] NOT NULL,
	[Value] [nvarchar](256) NOT NULL,
	[ExpireAt] [datetime] NULL,
 CONSTRAINT [PK_HangFire_Set] PRIMARY KEY CLUSTERED 
(
	[Key] ASC,
	[Value] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = ON, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [HangFire].[State]    Script Date: 11.6.2024. 17:44:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HangFire].[State](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[JobId] [bigint] NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Reason] [nvarchar](100) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Data] [nvarchar](max) NULL,
 CONSTRAINT [PK_HangFire_State] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC,
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240528172805_NewMigration', N'7.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240529112335_CourseStatistics', N'7.0.0')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240531204136_Statisticsss', N'7.0.0')
GO
SET IDENTITY_INSERT [dbo].[Courses] ON 

INSERT [dbo].[Courses] ([CourseId], [CreatorId], [Title], [Subtitle], [DurationInWeeks], [WeeklyHours], [Highlights], [Category], [CourseMark], [Approved], [Price]) VALUES (1, 6, N'Pilates', N'Kurs za instruktora pilatesa', 2, 3, N'Postanite sertifikovani pilates instruktor! Naučite vještine i tehnike vođenja pilates časova.', N'Zdravlje i fitnes', 0, 1, 36.99)
INSERT [dbo].[Courses] ([CourseId], [CreatorId], [Title], [Subtitle], [DurationInWeeks], [WeeklyHours], [Highlights], [Category], [CourseMark], [Approved], [Price]) VALUES (2, 6, N'Umjetnost samopouzdanja', N'Otkrijte snagu unutar sebe', 3, 3, N'Izgradite svoje samopouzdanje i otključajte potencijal kroz praktične vježbe i vođene meditacije.', N'Lični razvoj', 0, 1, 99)
INSERT [dbo].[Courses] ([CourseId], [CreatorId], [Title], [Subtitle], [DurationInWeeks], [WeeklyHours], [Highlights], [Category], [CourseMark], [Approved], [Price]) VALUES (3, 3, N'Putovanje kroz srpsku srednjovijekovnu istoriju', N'Otkrijte tajne Nemanjića i srednjovijekovne Srbije', 4, 4, N'Upoznajte slavnu prošlost Srbije kroz interaktivne lekcije i virtualne ekskurzije.', N'Nauka', 0, 1, 149)
INSERT [dbo].[Courses] ([CourseId], [CreatorId], [Title], [Subtitle], [DurationInWeeks], [WeeklyHours], [Highlights], [Category], [CourseMark], [Approved], [Price]) VALUES (4, 4, N'Srce na dlanu: Kardiologija u praksi', N'Otkrijte tajne zdravog srca i prevencije bolesti', 1, 5, N'Iskoristite najnovija medicinska saznanja i prakse za očuvanje zdravlja srca.', N'Zdravstvo i medicina', 0, 1, 79)
INSERT [dbo].[Courses] ([CourseId], [CreatorId], [Title], [Subtitle], [DurationInWeeks], [WeeklyHours], [Highlights], [Category], [CourseMark], [Approved], [Price]) VALUES (5, 5, N'Magnetizam u svakodnevnom životu', N'Razumijevanje sila prirode: Magnetizam i njegova primjena', 2, 6, N'Otkrijte tajne magnetizma i primijenite ih u modernoj tehnologiji.', N'Inženjerstvo', 0, 1, 89)
SET IDENTITY_INSERT [dbo].[Courses] OFF
GO
SET IDENTITY_INSERT [dbo].[Materials] ON 

INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (1, 1, N'Test.pdf', N'Test.pdf', 1, 1)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (2, 1, N'TEST VIDEO.mp4', N'TEST VIDEO.mp4', 1, 2)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (3, 1, N'Test word dokument.docx', N'Test word dokument.docx', 2, 3)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (4, 1, N'Testni txt dokument.txt', N'Testni txt dokument.txt', 2, 4)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (5, 2, N'TEST VIDEO.mp4', N'TEST VIDEO.mp4', 1, 1)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (6, 2, N'Test.pdf', N'Test.pdf', 1, 2)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (7, 2, N'Test word dokument.docx', N'Test word dokument.docx', 2, 3)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (8, 2, N'Testni txt dokument.txt', N'Testni txt dokument.txt', 3, 4)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (9, 3, N'Test.pdf', N'Test.pdf', 1, 1)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (10, 3, N'TEST VIDEO.mp4', N'TEST VIDEO.mp4', 2, 2)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (11, 3, N'Test word dokument.docx', N'Test word dokument.docx', 3, 3)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (12, 3, N'Testni txt dokument.txt', N'Testni txt dokument.txt', 4, 4)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (13, 4, N'Test.pdf', N'Test.pdf', 1, 1)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (14, 4, N'TEST VIDEO.mp4', N'TEST VIDEO.mp4', 1, 2)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (15, 4, N'Test word dokument.docx', N'Test word dokument.docx', 1, 3)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (16, 4, N'Testni txt dokument.txt', N'Testni txt dokument.txt', 1, 4)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (17, 5, N'TEST VIDEO.mp4', N'TEST VIDEO.mp4', 1, 1)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (18, 5, N'Testni txt dokument.txt', N'Testni txt dokument.txt', 1, 2)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (19, 5, N'Test word dokument.docx', N'Test word dokument.docx', 2, 3)
INSERT [dbo].[Materials] ([ContentId], [CourseId], [VideoFile], [TxtFile], [WeekNumber], [FileOrder]) VALUES (20, 5, N'Test.pdf', N'Test.pdf', 2, 4)
SET IDENTITY_INSERT [dbo].[Materials] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Email], [FirstName], [LastName], [PasswordHash], [PasswordSalt], [DateOfBirth], [UserType], [Title], [Approved]) VALUES (1, N'jugovicivana12@gmail.com', N'Ivana', N'Jugović', 0x3622F70F1B50E22105AB8F70AD6DD6054CEE4144D634B49F73F1ADFE266B8F998A77A9B8C05FDACF08E39FBBFEABE769A749B0A8184A64BD12B6A14E6FE16134, 0xEB8DF5C57A346E24BC095DF9CE23BB44C3453C6734C4792969829E5E1A8A1BC780EE24DE5F9C05419E1DF4E3A0A5DEEFD06273D84390138E305F548C06720425D72307BCDF1A2E02593E811A4BC449E4A4E046DF823345C340D640F2D116F1DC83666D35AA460FA75B270D8E6034BD21E7B607E7D142B4BFC3B960CAE0724B88, CAST(N'2000-12-01T00:00:00.0000000' AS DateTime2), N'Admin', N'Student', 1)
INSERT [dbo].[Users] ([Id], [Email], [FirstName], [LastName], [PasswordHash], [PasswordSalt], [DateOfBirth], [UserType], [Title], [Approved]) VALUES (2, N'lenasaraba8@gmail.com', N'Lena', N'Šaraba', 0xC028E4DFE1D651BEF6AE9DC26C5183996B2D2EC2B84172AC5CC76088A5C33769B7C05D244399425B8181096680677AE6601E2E811065BE2A3CF6705151CED1C2, 0xF928C981A047CD5CE16FE8CFA09A82C8DB781E4119BFEE641750DBD976D9E2FF4D878A36514A8F7119F5C3B5A1D9547C4C9E003C7DD2E6AF7727C483788D3477BBFB284242F6372FBDD4657C2C819D2653D2BF498D420F4690A22645EE3F8FEA18CD54F8E1C4EBE37F0390AE8978DB1EAD6593ABADCA8B1FC6E48F2DF64533F2, CAST(N'2001-07-31T00:00:00.0000000' AS DateTime2), N'Admin', N'Student', 1)
INSERT [dbo].[Users] ([Id], [Email], [FirstName], [LastName], [PasswordHash], [PasswordSalt], [DateOfBirth], [UserType], [Title], [Approved]) VALUES (3, N'lenassslena1@gmail.com', N'Marko', N'Marković', 0x34EB5A2276A442CD13111BB565290579079CC68FE842B65A61423A28970E1A91564AABB0109BCC109EDDE004BBE12E36549C93D8939171371AED023E2CF35082, 0x2FB02B161684C946EC44A17F225EFF230FD90997DD786DDF803C9EE306CF84A5A8655EF01DC9AD436BB185267141D52C5C9583F201652549CD58416DF4289F92779A964361C40DA727E7EEAB746A9F1D120F72E7C397D53B2F9E015D5B95582FBC44929039571F2635F0CB0390D7F484F59E5CE342C6E2CA3421C7320EFCE021, CAST(N'1980-01-01T00:00:00.0000000' AS DateTime2), N'Korisnik', N'Diplomirani profesor istorije', 1)
INSERT [dbo].[Users] ([Id], [Email], [FirstName], [LastName], [PasswordHash], [PasswordSalt], [DateOfBirth], [UserType], [Title], [Approved]) VALUES (4, N'ivanajugovic022@gmail.com', N'Petar', N'Petrović', 0x4D7A0DB7ACF3B8D2543407E407CD72244767519DAA1338EBD691363F48D0F76B8E40780CEBCBB6D40780CEAE4E2A79880E72F03B6712E02D0536A0347FE85F5D, 0x5958235DDD74FF8685417CC797697DE2A5F055F2BDDBB02BC2244C52320DD4D6563D692FA6FB2FEED30F0F15E842F4829E9C9386F49A2D2E45F1BBEE6166495DCCD90505E77F01C22704307746EE29564B1889F19369C0CA70BBD2DDFAFDBB6D4D00292A2A0C63DE907E56B715354DCCEF6588E7BC55ED0E57C6EAB4EE063393, CAST(N'1976-02-02T00:00:00.0000000' AS DateTime2), N'Korisnik', N'Doktor medicine', 1)
INSERT [dbo].[Users] ([Id], [Email], [FirstName], [LastName], [PasswordHash], [PasswordSalt], [DateOfBirth], [UserType], [Title], [Approved]) VALUES (5, N'lenasaraba@hotmail.com', N'Bojana', N'Bojanić', 0xB58F09856299C731E88AF14E2BBB36C86144D187B513ED217E7422B2473707667F16DE890543CF6CA6C020913636CDEE3B0437BC5F2BED53C4E7F23C0403739E, 0x7D1766D4654A1D3A25A7C1CB870F88053CF84FCCBB51058575BB1F9E24201D1C2E0EFAEB50AFBF345107D7A0D50EBF33D33FE64799A894719B6B40EDCD4A80EE6C6BEB9F74B3D91FC2CF448FF46581C39346F9DF35119AB44162901E5138ECC0DA1668735DF674BDF3341DC1C9257B3077E849A360A80D4F94C376A7B64D24F6, CAST(N'1991-03-03T00:00:00.0000000' AS DateTime2), N'Korisnik', N'Diplomirani inženjer elektrotehnike', 1)
INSERT [dbo].[Users] ([Id], [Email], [FirstName], [LastName], [PasswordHash], [PasswordSalt], [DateOfBirth], [UserType], [Title], [Approved]) VALUES (6, N'iigrice44@gmail.com', N'Dejana', N'Dejanić', 0x4D4BCB5B36CE00F74B22F1AEC30A335FF240FDF3AAA54BCAC448D0FB7DC1196669AFF5D00C93D8B32F22C206D71AE1A120A82958D8EBDE2DD3BADB6A51BAA2D3, 0x45F61A6CBB164C2952FBAC9F82ACE5BE88258FEE251A24118B76A67E40F9FE8F37750112EB3DEEC43A6BFA0A8C2B9214983E8B0C3CD06D58BAC2784828305F5283EA0BCD40B19CD7F99062D1C759BF018C821EF80FFF71D760D60610F00E80B8F8F3582EA40FD6CBC431AC1FF8CBC00CD0976BAAD451B28B53B506E7D1B1EBEB, CAST(N'1986-04-04T00:00:00.0000000' AS DateTime2), N'Korisnik', N'Diplomirani profesor fizičkog vaspitanja', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'CreatedAt', N'2024-06-11T11:40:35.4039666Z', NULL)
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'Cron', N'0 0 * * 1', NULL)
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'Job', N'{"Type":"ITP_Intellecta.Services.IEmailService, ITP_Intellecta, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","Method":"SendEmailToAllUsers","ParameterTypes":"[]","Arguments":"[]"}', NULL)
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'NextExecution', N'2024-06-17T00:00:00.0000000Z', NULL)
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'Queue', N'default', NULL)
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'TimeZoneId', N'UTC', NULL)
INSERT [HangFire].[Hash] ([Key], [Field], [Value], [ExpireAt]) VALUES (N'recurring-job:send-weekly-email', N'V', N'2', NULL)
GO
INSERT [HangFire].[Schema] ([Version]) VALUES (9)
GO
INSERT [HangFire].[Set] ([Key], [Score], [Value], [ExpireAt]) VALUES (N'recurring-jobs', 1718582400, N'send-weekly-email', NULL)
GO
ALTER TABLE [dbo].[Statistics] ADD  DEFAULT ((0)) FOR [Week]
GO
ALTER TABLE [dbo].[Courses]  WITH CHECK ADD  CONSTRAINT [FK_Courses_Users_CreatorId] FOREIGN KEY([CreatorId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Courses] CHECK CONSTRAINT [FK_Courses_Users_CreatorId]
GO
ALTER TABLE [dbo].[CourseUser]  WITH CHECK ADD  CONSTRAINT [FK_CourseUser_Courses_CoursesCourseId] FOREIGN KEY([CoursesCourseId])
REFERENCES [dbo].[Courses] ([CourseId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CourseUser] CHECK CONSTRAINT [FK_CourseUser_Courses_CoursesCourseId]
GO
ALTER TABLE [dbo].[CourseUser]  WITH CHECK ADD  CONSTRAINT [FK_CourseUser_Users_UsersId] FOREIGN KEY([UsersId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[CourseUser] CHECK CONSTRAINT [FK_CourseUser_Users_UsersId]
GO
ALTER TABLE [dbo].[Materials]  WITH CHECK ADD  CONSTRAINT [FK_Materials_Courses_CourseId] FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Materials] CHECK CONSTRAINT [FK_Materials_Courses_CourseId]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Courses_CourseId] FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Courses_CourseId]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Users_UserId]
GO
ALTER TABLE [dbo].[Statistics]  WITH CHECK ADD  CONSTRAINT [FK_Statistics_Courses_CourseId] FOREIGN KEY([CourseId])
REFERENCES [dbo].[Courses] ([CourseId])
GO
ALTER TABLE [dbo].[Statistics] CHECK CONSTRAINT [FK_Statistics_Courses_CourseId]
GO
ALTER TABLE [dbo].[Statistics]  WITH CHECK ADD  CONSTRAINT [FK_Statistics_Materials_MaterialId] FOREIGN KEY([MaterialId])
REFERENCES [dbo].[Materials] ([ContentId])
GO
ALTER TABLE [dbo].[Statistics] CHECK CONSTRAINT [FK_Statistics_Materials_MaterialId]
GO
ALTER TABLE [dbo].[Statistics]  WITH CHECK ADD  CONSTRAINT [FK_Statistics_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Statistics] CHECK CONSTRAINT [FK_Statistics_Users_UserId]
GO
ALTER TABLE [HangFire].[JobParameter]  WITH CHECK ADD  CONSTRAINT [FK_HangFire_JobParameter_Job] FOREIGN KEY([JobId])
REFERENCES [HangFire].[Job] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [HangFire].[JobParameter] CHECK CONSTRAINT [FK_HangFire_JobParameter_Job]
GO
ALTER TABLE [HangFire].[State]  WITH CHECK ADD  CONSTRAINT [FK_HangFire_State_Job] FOREIGN KEY([JobId])
REFERENCES [HangFire].[Job] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [HangFire].[State] CHECK CONSTRAINT [FK_HangFire_State_Job]
GO
