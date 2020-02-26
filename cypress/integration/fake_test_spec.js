// if (ENV === "development" || ENV === "test") {
//   Promise.all([
//     read(path.resolve(__dirname, `db/schema/create.sql`)),
//     read(path.resolve(__dirname, `db/schema/${ENV}.sql`))
//   ])
//     .then(([create, seed]) => {
//       app.get("/api/debug/reset", (request, response) => {
//         db.query(create)
//           .then(() => db.query(seed))
//           .then(() => {
//             console.log("Database Reset");
//             response.status(200).send("Database Reset");
//           });
//       });
//     })
//     .catch(error => {
//       console.log(`Error setting up the reset route: ${error}`);
//     });
// }

describe("navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday").click();
    cy.get("li", {value:"Tuesday"})
      .should("have.class", "day-list__item--selected");
  });
})
    // beforeEach(() => {
    //   cy.visit('/');
    //   cy.contains('Monday');
    // });
    // it('user can create an appointment', () => {
    //   cy.get('[alt="Add"]')
    //     .first()
    //     .click();
    //   cy.get('[data-testid="student-name-input"]')
    //     .type('Lydia Miller-Jones')
    //   cy.get(".interviewers__item--selected").should('not.exist')
    //   cy.get('.interviewers__item-image')
    //     .first()
    //     .click();
    //   cy.get(".interviewers__item--selected").should('exist')
    // })