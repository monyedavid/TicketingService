// activities exercised by admins ༼ つ ◕_◕ ༽つ

type read_delete = "read" | "delete";

// Data entry on constitution for nigeria ༼ つ ◕_◕ ༽つ
// dec_ng > Data Entry constitution ng
declare namespace _dec_ng {
  type type =
    | "chapters"
    | "schedules"
    | "parts"
    | "articles"
    | "sections"
    | "subsections"
    | "paragraphs"
    | "subparagraphs"
    | "area_council"
    | "del_states_of_fed"
    | "year"
    | "items";

  interface area_council {
    id?: number;
    area_council?: string;
    headquarters?: string;
    paragraph_id?: any;
  }

  interface article {
    id?: number;
    article?: string;
    parts_id?: any;
    chapter_id?: any;
    schedule_id?: any;
  }

  interface chapters {
    id?: number;
    title?: string;
    title_alt?: string;
    description?: string;
  }

  interface del_states_of_fed {
    id?: number;
    state?: string;
    lga?: string;
    capital?: string;
    paragraph_id?: any;
  }

  interface item {
    id?: number;
    item_no?: number;
    Item?: string;
  }

  interface paragraph {
    id?: number;
    paragraph?: string;
    paragraph_content?: string;
    part_id?: any;
    article_id?: any;
    section_id?: any;
    subsection_id?: any;
  }

  interface parts {
    id?: number;
    title?: string;
    title_alt?: string;
    description?: string;
    chapter_id?: any;
    schedule_id?: any;
  }

  interface schedules {
    id?: number;
    title?: string;
    title_alt?: string;
    description?: string;
  }

  interface section {
    id?: number;
    section?: string;
    section_title?: string;
    section_content?: string;
    chapter_id?: any;
    part_id?: any;
    article_id?: any;
  }

  interface subparagraph {
    id?: number;
    subparagraph?: string;
    subparagraph_content?: string;
    paragraph_id?: any;
    subsection_id?: any;
  }

  interface subsection {
    id: number;
    subsection: string;
    subsection_content: string;
    section_id: any;
  }

  interface year {
    year_id?: number;
    year?: number;
  }
}

// Data Entry on civilProcedureRules for nigeria
// decpr_ng >  Data Entry cpr ng
declare namespace _decpr_ng {
  type admin_de_methods = "get" | "set";

  type type =
    | "courts"
    | "court_categories"
    | "court_order"
    | "court_rule"
    | "forms"
    | "state"
    | "sub_rule"
    | "year";

  interface get {
    courts?: [{ court_id: number }];
    court_categories?: [{ court_category_id: number }];
    court_order?: [{ order_id: number }];
    court_rule?: [{ rule_id: number }];
    forms?: [{ form_id: number }];
    state?: [{ state_id: number }];
    sub_rule?: [{ sub_rule_id: number }];
    year_ng?: [{ year_id: number }];
  }

  interface courts {
    court_id?: number;
    court_description?: string;
    state_id?: number;
    court_category_id?: number;
  }

  interface court_categories {
    court_category_id?: number;
    court_category?: string;
    court_description?: string;
  }

  interface court_order {
    order_id?: number;
    order_heading?: string;
    order_description?: string;
    court_id?: number;
    year_id?: number;
  }

  interface court_rule {
    rule_id?: number;
    rule?: number;
    rule_description?: string;
    order_id?: number;
    form?: any;
  }

  interface forms {
    form_id?: number;
    form_title?: string;
    rule_id?: number;
    file?: any;
  }

  interface state {
    state_id?: number;
    state?: string;
  }

  interface sub_rule {
    sub_rule_id?: number;
    sub_rule?: string;
    sub_rule_title?: string;
    sub_rule_content?: string;
    rule_id?: number;
  }

  interface year_ng {
    year_id?: number;
    year?: string;
  }
}

// Data Entry on LawPool for nigeria
// delawpool_ng >  Data Entry lawpool ng
declare namespace _delawpool_ng {
  type type =
    | "courts"
    | "court_categories"
    | "court_orders"
    | "court_order_rules"
    | "cases"
    | "head_notes"
    | "judgement"
    | "judgement_types"
    | "justices"
    | "ratio_decidendi"
    | "state"
    | "subject_matter";
}
