using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userLanguageId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserLanguages",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserLanguages_UserId",
                table: "UserLanguages",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages");

            migrationBuilder.DropIndex(
                name: "IX_UserLanguages_UserId",
                table: "UserLanguages");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserLanguages");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages",
                columns: new[] { "UserId", "LanguageId" });
        }
    }
}
