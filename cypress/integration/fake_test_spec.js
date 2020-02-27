

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
   