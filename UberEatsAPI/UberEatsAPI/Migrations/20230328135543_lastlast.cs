using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UberEatsAPI.Migrations
{
    public partial class lastlast : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "lat",
                table: "DBCouriers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "lng",
                table: "DBCouriers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lat",
                table: "DBCouriers");

            migrationBuilder.DropColumn(
                name: "lng",
                table: "DBCouriers");
        }
    }
}
