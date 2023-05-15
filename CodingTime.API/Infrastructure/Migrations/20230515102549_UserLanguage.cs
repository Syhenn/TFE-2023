using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UserLanguage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguage_Langages_LangageId",
                table: "UserLanguage");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguage_Users_UserId",
                table: "UserLanguage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLanguage",
                table: "UserLanguage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Langages",
                table: "Langages");

            migrationBuilder.RenameTable(
                name: "UserLanguage",
                newName: "UserLanguages");

            migrationBuilder.RenameTable(
                name: "Langages",
                newName: "Languages");

            migrationBuilder.RenameColumn(
                name: "LangageId",
                table: "UserLanguages",
                newName: "LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_UserLanguage_LangageId",
                table: "UserLanguages",
                newName: "IX_UserLanguages_LanguageId");

            migrationBuilder.AlterColumn<int>(
                name: "UserRole",
                table: "Users",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages",
                columns: new[] { "UserId", "LanguageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Languages",
                table: "Languages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguages_Languages_LanguageId",
                table: "UserLanguages",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguages_Users_UserId",
                table: "UserLanguages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguages_Languages_LanguageId",
                table: "UserLanguages");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLanguages_Users_UserId",
                table: "UserLanguages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLanguages",
                table: "UserLanguages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Languages",
                table: "Languages");

            migrationBuilder.RenameTable(
                name: "UserLanguages",
                newName: "UserLanguage");

            migrationBuilder.RenameTable(
                name: "Languages",
                newName: "Langages");

            migrationBuilder.RenameColumn(
                name: "LanguageId",
                table: "UserLanguage",
                newName: "LangageId");

            migrationBuilder.RenameIndex(
                name: "IX_UserLanguages_LanguageId",
                table: "UserLanguage",
                newName: "IX_UserLanguage_LangageId");

            migrationBuilder.AlterColumn<int>(
                name: "UserRole",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLanguage",
                table: "UserLanguage",
                columns: new[] { "UserId", "LangageId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Langages",
                table: "Langages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguage_Langages_LangageId",
                table: "UserLanguage",
                column: "LangageId",
                principalTable: "Langages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLanguage_Users_UserId",
                table: "UserLanguage",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
