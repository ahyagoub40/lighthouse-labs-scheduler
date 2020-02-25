describe("navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();
    cy.get("li", {value:"Tuesday"})
      .should("have.css", "background-color", "rgb(242, 242, 242)");
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