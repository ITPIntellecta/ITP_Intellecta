using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ITPIntellecta.Migrations
{
    /// <inheritdoc />
    public partial class Statisticsss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Week",
                table: "Statistics",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Week",
                table: "Statistics");
        }
    }
}
