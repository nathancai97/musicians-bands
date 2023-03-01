const { sequelize } = require("./db");
const { Band, Musician } = require("./index");

describe("Band and Musician Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test("can create a Band", async () => {
    // TODO - test creating a band
    const testBand = await Band.create({
      name: "Fall Out Boys",
      genre: "Rock",
      showCount: 100,
    });
    expect(testBand.name).toBe("Fall Out Boys");
    expect(testBand.genre).toBe("Rock");
    expect(testBand.showCount).toBe(100);
  });

  test("can delete a Band", async () => {
    // Create a band to be deleted
    const testBand = await Band.create({
      name: "Fall Out Boys",
      genre: "Rock",
      showCount: 100,
    });
    await Band.destroy({ where: { id: testBand.id } });
    const deletedBand = await Band.findByPk(testBand.id);
    expect(deletedBand).toBeNull();
  });

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    const testMusician = await Musician.create({
      name: "Nathan",
      instrumentProperties: "Trumpet",
    });
    expect(testMusician.name).toBe("Nathan");
    expect(testMusician.instrumentProperties).toBe("Trumpet");
  });

  test("can update a Musician", async () => {
    const testMusician = await Musician.create({
      name: "Nathan",
      instrumentProperties: "Trumpet",
    });
    testMusician.name = "Still Nathan";
    testMusician.instrumentProperties = "Alto Saxophone";
    await testMusician.save();
    const updatedMusician = await Musician.findByPk(testMusician.id);
    expect(updatedMusician.name).toBe("Still Nathan");
    expect(updatedMusician.instrumentProperties).toBe("Alto Saxophone");
  });

  test("bands and can have many musicians", async () => {
    let band = await Band.create({
      name: "Fall Out Boys",
      genre: "Rock",
      showCount: 5,
    });
    let nathan = await Musician.create({
      name: "Nathan",
      instrumentProperties: "Saxophone",
    });
    let sonam = await Musician.create({
      name: "Sonam",
      instrumentProperties: "Guitar",
    });
    await band.addMusician(nathan);
    await band.addMusician(sonam);
    const bandMusicians = await band.getMusicians();
    console.log(bandMusicians);
    expect(bandMusicians.length).toBe(2);
    expect(bandMusicians[0] instanceof Musician).toBeTruthy;
    expect(bandMusicians[0].name).toBe("Nathan");
    expect(bandMusicians[0].instrumentProperties).toBe("Saxophone");
    expect(bandMusicians[1] instanceof Musician).toBeTruthy;
    expect(bandMusicians[1].name).toBe("Sonam");
    expect(bandMusicians[1].instrumentProperties).toBe("Guitar");
  });
});
