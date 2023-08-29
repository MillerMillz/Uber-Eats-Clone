using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UberEatsAPI.Migrations
{
    public partial class DishImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imagesource",
                table: "Dishes",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imagesource",
                table: "Dishes");
        }
    }
}
