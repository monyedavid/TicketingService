export const isDbConnectionName = function (name: string) {
  return (
    name == "lawpool_ng" ||
    name == "constitution_ng" ||
    name == "civilprocedurerules_ng"
  );
};

export const ng_cs_type = function (value: string) {
  return value == "chapter" || value == "schedule";
};

export const ng_cs_depth = function (value: number) {
  return value == 1 || value == 2 || value == 3 || value == 4;
};

// Data Entry Constitution type for all regions.. will be further validated down the region chain ༼ つ ◕_◕ ༽つ
export const dect = function (value: string) {
  return (
    // for region nigeria
    value == "chapters" ||
    value == "schedules" ||
    value == "parts" ||
    value == "articles" ||
    value == "sections" ||
    value == "subsections" ||
    value == "paragraphs" ||
    value == "subparagraphs" ||
    value == "area_council" ||
    value == "del_states_of_fed" ||
    value == "year" ||
    value == "items"
    // for region gha, sen , lbr
  );
};

// Data Entry Civil Procedure type for all regions.. will be further validated down the region chain ༼ つ ◕_◕ ༽つ
export const decpr = function (value: string) {
  return (
    // for region nigeria
    value == "courts" ||
    value == "court_categories" ||
    value == "court_order" ||
    value == "court_rule" ||
    value == "forms" ||
    value == "state" ||
    value == "sub_rule" ||
    value == "year"
    // for region gha, sen , lbr
  );
};

// Data Entry Law Pool type for all regions.. will be further validated down the region chain ༼ つ ◕_◕ ༽つ
export const delp = function (value: string) {
  return (
    value == "courts" ||
    value == "court_categories" ||
    value == "court_orders" ||
    value == "court_order_rules" ||
    value == "cases" ||
    value == "head_notes" ||
    value == "judgement" ||
    value == "judgement_types" ||
    value == "justices" ||
    value == "ratio_decidendi" ||
    value == "state" ||
    value == "subject_matter"
  );
};

export const isUserRole = function (value: number) {
  return (
    value == 1 ||
    value == 2 ||
    value == 3 ||
    value == 5 ||
    value == 6 ||
    value == 7 ||
    value == 8 ||
    value == 9 ||
    value == 10 ||
    value == 11 ||
    value == 12
  );
};
