using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UberEatsAPI.Migrations
{
    public partial class anotherOne : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransportMode",
                table: "DBCouriers",
                newName: "TransportationMode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransportationMode",
                table: "DBCouriers",
                newName: "TransportMode");
        }
    }
}
