using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class Course : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TxtFile",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "VideoFile",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "Review",
                table: "Courses",
                newName: "CourseMark");

            migrationBuilder.AddColumn<bool>(
                name: "Approved",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approved",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "CourseMark",
                table: "Courses",
                newName: "Review");

            migrationBuilder.AddColumn<string>(
                name: "TxtFile",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VideoFile",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
