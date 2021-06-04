interface IBigNumber {
    Sign: number;
    Exponent: number;
    Depth: number;

    toString(decimals?: number): string;
    toNumber(): number;
    normalize(): void;
    parse(str: string): boolean;
    export(): object;
    update(sign: number, exponent: number, depth: number): this;
    from(str: string): IBigNumber;
}

interface ISaveGame {
    Achievements: IAchievements;
    Achievement: IAchievement;
    Automation: IAutomation;
    BuyAmounts: IBuyAmounts;
    Function: IFunction;
    Minigames: IMinigames;
    Options: IOptions;
    PrestigeCurrency: IPrestigeCurrency;
    Prestige: IPrestige;
    Researches: IResearches;
    Research: IResearch;
    Rewards: IRewards;
    Session: ISession;
    Stars: IStars;
    StarBonus: IStarBonus;
    Statistics: IStatistics;
    Story: IStory;
    Students: IStudents;
    Theories: ITheories;
    Theory: ITheory;
    Time: ITime;
    Upgrade: IUpgrade;
    Variable: IVariable;
}

interface IAchievements {
    HiddenCategoryIds: number[];
}

interface IAchievement {
    Unlocked90: boolean;
    DateUnlockedUtc90: Date;
    Unlocked0: boolean;
    DateUnlockedUtc0: Date;
    Unlocked1: boolean;
    DateUnlockedUtc1: Date;
    Unlocked2: boolean;
    DateUnlockedUtc2: Date;
    Unlocked3: boolean;
    DateUnlockedUtc3: Date;
    Unlocked4: boolean;
    DateUnlockedUtc4: Date;
    Unlocked5: boolean;
    DateUnlockedUtc5: Date;
    Unlocked6: boolean;
    DateUnlockedUtc6: Date;
    Unlocked7: boolean;
    DateUnlockedUtc7: Date;
    Unlocked8: boolean;
    DateUnlockedUtc8: Date;
    Unlocked9: boolean;
    DateUnlockedUtc9: Date;
    Unlocked10: boolean;
    DateUnlockedUtc10: Date;
    Unlocked11: boolean;
    DateUnlockedUtc11: Date;
    Unlocked12: boolean;
    DateUnlockedUtc12: Date;
    Unlocked13: boolean;
    DateUnlockedUtc13: Date;
    Unlocked14: boolean;
    DateUnlockedUtc14: Date;
    Unlocked62: boolean;
    DateUnlockedUtc62: Date;
    Unlocked63: boolean;
    DateUnlockedUtc63: Date;
    Unlocked64: boolean;
    DateUnlockedUtc64: Date;
    Unlocked65: boolean;
    DateUnlockedUtc65: Date;
    Unlocked66: boolean;
    DateUnlockedUtc66: Date;
    Unlocked67: boolean;
    DateUnlockedUtc67: Date;
    Unlocked68: boolean;
    DateUnlockedUtc68: Date;
    Unlocked101: boolean;
    DateUnlockedUtc101: Date;
    Unlocked102: boolean;
    DateUnlockedUtc102: Date;
    Unlocked103: boolean;
    DateUnlockedUtc103: Date;
    Unlocked104: boolean;
    DateUnlockedUtc104: Date;
    Unlocked15: boolean;
    DateUnlockedUtc15: Date;
    Unlocked16: boolean;
    DateUnlockedUtc16: Date;
    Unlocked17: boolean;
    DateUnlockedUtc17: Date;
    Unlocked18: boolean;
    DateUnlockedUtc18: Date;
    Unlocked19: boolean;
    DateUnlockedUtc19: Date;
    Unlocked20: boolean;
    DateUnlockedUtc20: Date;
    Unlocked21: boolean;
    DateUnlockedUtc21: Date;
    Unlocked22: boolean;
    DateUnlockedUtc22: Date;
    Unlocked23: boolean;
    DateUnlockedUtc23: Date;
    Unlocked24: boolean;
    DateUnlockedUtc24: Date;
    Unlocked25: boolean;
    DateUnlockedUtc25: Date;
    Unlocked26: boolean;
    DateUnlockedUtc26: Date;
    Unlocked27: boolean;
    DateUnlockedUtc27: Date;
    Unlocked28: boolean;
    DateUnlockedUtc28: Date;
    Unlocked29: boolean;
    DateUnlockedUtc29: Date;
    Unlocked30: boolean;
    DateUnlockedUtc30: Date;
    Unlocked69: boolean;
    DateUnlockedUtc69: Date;
    Unlocked55: boolean;
    DateUnlockedUtc55: Date;
    Unlocked56: boolean;
    DateUnlockedUtc56: Date;
    Unlocked57: boolean;
    DateUnlockedUtc57: Date;
    Unlocked76: boolean;
    DateUnlockedUtc76: Date;
    Unlocked77: boolean;
    DateUnlockedUtc77: Date;
    Unlocked91: boolean;
    DateUnlockedUtc91: Date;
    Unlocked92: boolean;
    DateUnlockedUtc92: Date;
    Unlocked93: boolean;
    DateUnlockedUtc93: Date;
    Unlocked94: boolean;
    DateUnlockedUtc94: Date;
    Unlocked95: boolean;
    DateUnlockedUtc95: Date;
    Unlocked96: boolean;
    DateUnlockedUtc96: Date;
    Unlocked97: boolean;
    DateUnlockedUtc97: Date;
    Unlocked98: boolean;
    DateUnlockedUtc98: Date;
    Unlocked99: boolean;
    DateUnlockedUtc99: Date;
    Unlocked100: boolean;
    DateUnlockedUtc100: Date;
    Unlocked105: boolean;
    DateUnlockedUtc105: Date;
    Unlocked106: boolean;
    DateUnlockedUtc106: Date;
    Unlocked107: boolean;
    DateUnlockedUtc107: Date;
    Unlocked108: boolean;
    DateUnlockedUtc108: Date;
    Unlocked109: boolean;
    DateUnlockedUtc109: Date;
    Unlocked110: boolean;
    DateUnlockedUtc110: Date;
    Unlocked111: boolean;
    DateUnlockedUtc111: Date;
    Unlocked112: boolean;
    DateUnlockedUtc112: Date;
    Unlocked31: boolean;
    DateUnlockedUtc31: Date;
    Unlocked32: boolean;
    DateUnlockedUtc32: Date;
    Unlocked33: boolean;
    DateUnlockedUtc33: Date;
    Unlocked34: boolean;
    DateUnlockedUtc34: Date;
    Unlocked35: boolean;
    DateUnlockedUtc35: Date;
    Unlocked36: boolean;
    DateUnlockedUtc36: Date;
    Unlocked37: boolean;
    DateUnlockedUtc37: Date;
    Unlocked38: boolean;
    DateUnlockedUtc38: Date;
    Unlocked39: boolean;
    DateUnlockedUtc39: Date;
    Unlocked40: boolean;
    DateUnlockedUtc40: Date;
    Unlocked41: boolean;
    DateUnlockedUtc41: Date;
    Unlocked42: boolean;
    DateUnlockedUtc42: Date;
    Unlocked43: boolean;
    DateUnlockedUtc43: Date;
    Unlocked44: boolean;
    DateUnlockedUtc44: Date;
    Unlocked45: boolean;
    DateUnlockedUtc45: Date;
    Unlocked46: boolean;
    DateUnlockedUtc46: Date;
    Unlocked70: boolean;
    DateUnlockedUtc70: Date;
    Unlocked47: boolean;
    DateUnlockedUtc47: Date;
    Unlocked48: boolean;
    DateUnlockedUtc48: Date;
    Unlocked49: boolean;
    DateUnlockedUtc49: Date;
    Unlocked50: boolean;
    DateUnlockedUtc50: Date;
    Unlocked51: boolean;
    DateUnlockedUtc51: Date;
    Unlocked71: boolean;
    DateUnlockedUtc71: Date;
    Unlocked72: boolean;
    DateUnlockedUtc72: Date;
    Unlocked73: boolean;
    DateUnlockedUtc73: Date;
    Unlocked52: boolean;
    DateUnlockedUtc52: Date;
    Unlocked53: boolean;
    DateUnlockedUtc53: Date;
    Unlocked54: boolean;
    DateUnlockedUtc54: Date;
    Unlocked74: boolean;
    DateUnlockedUtc74: Date;
    Unlocked75: boolean;
    DateUnlockedUtc75: Date;
    Unlocked58: boolean;
    DateUnlockedUtc58: Date;
    Unlocked59: boolean;
    DateUnlockedUtc59: Date;
    Unlocked60: boolean;
    DateUnlockedUtc60: Date;
    Unlocked61: boolean;
    DateUnlockedUtc61: Date;
    Unlocked114: boolean;
    DateUnlockedUtc114: Date;
    Unlocked115: boolean;
    DateUnlockedUtc115: Date;
    Unlocked116: boolean;
    DateUnlockedUtc116: Date;
    Unlocked117: boolean;
    DateUnlockedUtc117: Date;
    Unlocked118: boolean;
    DateUnlockedUtc118: Date;
    Unlocked119: boolean;
    DateUnlockedUtc119: Date;
    Unlocked120: boolean;
    DateUnlockedUtc120: Date;
    Unlocked121: boolean;
    DateUnlockedUtc121: Date;
    Unlocked122: boolean;
    DateUnlockedUtc122: Date;
    Unlocked123: boolean;
    DateUnlockedUtc123: Date;
    Unlocked78: boolean;
    DateUnlockedUtc78: Date;
    Unlocked79: boolean;
    DateUnlockedUtc79: Date;
    Unlocked80: boolean;
    DateUnlockedUtc80: Date;
    Unlocked81: boolean;
    DateUnlockedUtc81: Date;
    Unlocked82: boolean;
    DateUnlockedUtc82: Date;
    Unlocked83: boolean;
    DateUnlockedUtc83: Date;
    Unlocked84: boolean;
    DateUnlockedUtc84: Date;
    Unlocked85: boolean;
    DateUnlockedUtc85: Date;
    Unlocked86: boolean;
    DateUnlockedUtc86: Date;
    Unlocked87: boolean;
    DateUnlockedUtc87: Date;
    Unlocked88: boolean;
    DateUnlockedUtc88: Date;
    Unlocked89: boolean;
    DateUnlockedUtc89: Date;
    Unlocked113: boolean;
    DateUnlockedUtc113: Date;
}

interface IAutomation {
    BuyAllButton: boolean;
    VariablesEnable: boolean;
    VariablesActive: boolean;
    UpgradesEnable: boolean;
    UpgradesActive: boolean;
    PrestigeEnable: boolean;
    PrestigeActive: boolean;
    PrestigeMode: number;
    PrestigeRatio: IBigNumber;
    PrestigeRatioString: string;
    PrestigeTime: number;
    PrestigeExpressionString: string;
    PreContextTime: IBigNumber;
    PreContextPreviousTime: IBigNumber;
    PreContextPreviousTokenValues: IPreContextPreviousTokenValues;
    PreContextTimers: IPreContextTimers;
    PreContextSmoothTimes: IPreContextSmoothTimes;
    PreContextSmoothPreviousValues: IPreContextSmoothPreviousValues;
    SupremacyEnable: boolean;
    SupremacyActive: boolean;
    SupremacyMode: number;
    SupremacyRatio: IBigNumber;
    SupremacyRatioString: string;
    SupremacyExpressionString: string;
    SupContextTime: IBigNumber;
    SupContextPreviousTime: IBigNumber;
    SupContextPreviousTokenValues: ISupContextPreviousTokenValues;
    SupContextTimers: ISupContextTimers;
    SupContextSmoothTimes: ISupContextSmoothTimes;
    SupContextSmoothPreviousValues: ISupContextSmoothPreviousValues;
    Rate: number;
}

interface IPreContextPreviousTokenValues {
    2: IBigNumber;
}

interface IPreContextTimers {
    0: IBigNumber;
}

interface IPreContextSmoothTimes {
}

interface IPreContextSmoothPreviousValues {
}

interface ISupContextPreviousTokenValues {
    2: IBigNumber;
}

interface ISupContextTimers {
    0: IBigNumber;
}

interface ISupContextSmoothTimes {
    66: IBigNumber;
    95: IBigNumber;
    111: IBigNumber;
}

interface ISupContextSmoothPreviousValues {
    66: IBigNumber;
    95: IBigNumber;
    111: IBigNumber;
}

interface IBuyAmounts {
    VariablesAmount: number;
    UpgradesAmount: number;
    StarBonusesAmount: number;
    ResearchesAmount: number;
    TheoryUpgradesAmount: number;
    TheoryPermUpgradesAmount: number;
    TheoryMileUpgradesAmount: number;
}

interface IFunction {
    Value: IBigNumber;
    CumulativeValue: IBigNumber;
    B: IBigNumber;
    ActiveLayerCount: number;
    LayerValue0: IBigNumber;
    LayerValue1: IBigNumber;
    LayerValue2: IBigNumber;
    LayerValue3: IBigNumber;
    LayerValue4: IBigNumber;
    LayerValue5: IBigNumber;
    LayerValue6: IBigNumber;
    LayerValue7: IBigNumber;
}

interface IMinigames {
    FifteenAvailable: boolean;
    FifteenBestTimesV2: IFifteenBestTimesV2;
    TorusAvailable: boolean;
    TorusBestTimesV2: ITorusBestTimesV2;
    ArrowAvailable: boolean;
    ArrowBestTimesV2: IArrowBestTimesV2;
}

interface IFifteenBestTimesV2 {
    3: IMiniGameScore;
    4: IMiniGameScore;
    5: IMiniGameScore;
}

interface IMiniGameScore {
    Time: number;
    Moves: number;
}

interface ITorusBestTimesV2 {
    3: IMiniGameScore;
    5: IMiniGameScore;
    6: IMiniGameScore;
}

interface IArrowBestTimesV2 {
    1027: IMiniGameScore;
    1028: IMiniGameScore;
    66055: IMiniGameScore;
    67079: IMiniGameScore;
}

interface IOptions {
    IsSoundEnabled: boolean;
    IsMusicEnabled: boolean;
    Theme: string;
    GraphQuality: number;
    AchievementSortingMode: number;
    FifteenGameColorMode: number;
    FifteenGameHoverMode: number;
    FifteenGameAnimationMode: number;
    FifteenGameRestartMode: number;
    TorusGameColorMode: number;
    TorusFreeControlMode: number;
    TorusGameAnimationMode: number;
    TorusGameRestartMode: number;
    ArrowGameColorMode: number;
    ArrowGameDisplayMode: number;
    ArrowGameAnimationMode: number;
    ArrowGameRestartMode: number;
    AccelerationButtonPlacement: number;
    OfflineProgressMode: number;
    UISize: number;
    MainEquationFrameSizePercentage: number;
    TheoryEquationFrameSizePercentage: number;
}

interface IPrestigeCurrency {
    Prestige: IBigNumber;
    Supremacy: IBigNumber;
}

interface IPrestige {
    Infinity: IBigNumber;
}

interface IResearches {
    MaxUnlockedTheories: number;
}

interface IResearch {
    BoughtLevel0: number;
    BoughtLevel1: number;
    BoughtLevel2: number;
    BoughtLevel3: number;
    BoughtLevel4: number;
    BoughtLevel5: number;
    BoughtLevel101: number;
    BoughtLevel102: number;
    BoughtLevel103: number;
}

interface IRewards {
    EndtimeUtc: Date;
}

interface ISession {
    HasAskedToRate: boolean;
    HasAskedToSelectLanguage: boolean;
    HasGoneBackwardInTime: boolean;
    SessionClosedTimeUtc: Date;
    RemoveAdsPurchased: boolean;
    RemoveAdsActive: boolean;
    RemoveAdsLocalizedPrice: string;
    Donate1Purchased: boolean;
    Donate2Purchased: boolean;
    Donate3Purchased: boolean;
    Donate1LocalizedPrice: string;
    Donate2LocalizedPrice: string;
    Donate3LocalizedPrice: string;
    PrestigeTestExpressionString: string;
    SupremacyTestExpressionString: string;
    PreTestContextTime: IBigNumber;
    PreTestContextPreviousTime: IBigNumber;
    PreTestContextPreviousTokenValues: IPreTestContextPreviousTokenValues;
    PreTestContextTimers: IPreTestContextTimers;
    PreTestContextSmoothTimes: IPreTestContextSmoothTimes;
    PreTestContextSmoothPreviousValues: IPreTestContextSmoothPreviousValues;
    SupTestContextTime: IBigNumber;
    SupTestContextPreviousTime: IBigNumber;
    SupTestContextPreviousTokenValues: ISupTestContextPreviousTokenValues;
    SupTestContextTimers: ISupTestContextTimers;
    SupTestContextSmoothTimes: ISupTestContextSmoothTimes;
    SupTestContextSmoothPreviousValues: ISupTestContextSmoothPreviousValues;
    HasSeenStudents: boolean;
    HasSeenTheories: boolean;
    HasSeenFirstTheory: boolean;
    HasSeenTheoryUpgradePanel: boolean;
    HasSeenSecondTheory: boolean;
    HasSeenLastTheory: boolean;
    HasSeenPublication: boolean;
    Edited: boolean;
    Panel: number;
    GameId: string;
}

interface IPreTestContextPreviousTokenValues {
    2: IBigNumber;
}

interface IPreTestContextTimers {
    0: IBigNumber;
}

interface IPreTestContextSmoothTimes {
}

interface IPreTestContextSmoothPreviousValues {
}

interface ISupTestContextPreviousTokenValues {
    2: IBigNumber;
}

interface ISupTestContextTimers {
    0: IBigNumber;
}

interface ISupTestContextSmoothTimes {
    66: IBigNumber;
    95: IBigNumber;
    111: IBigNumber;
}

interface ISupTestContextSmoothPreviousValues {
    66: IBigNumber;
    95: IBigNumber;
    111: IBigNumber;
}

interface IStars {
    TapAmount2: IBigNumber;
    TickAmount2: IBigNumber;
    MinigameAmount2: IBigNumber;
    UsedAmount2: IBigNumber;
    PermanentUsedAmount2: IBigNumber;
}

interface IStarBonus {
    Level1000: number;
    Level2000: number;
    Level2001: number;
    Level2002: number;
    Level2003: number;
    Level2005: number;
    Level2004: number;
    Level3000: number;
    Level4001: number;
    Level4002: number;
    Level4003: number;
    Level4004: number;
    Level4005: number;
    Level4006: number;
    Level4007: number;
    Level4008: number;
    Level4009: number;
    Level4010: number;
    Level4011: number;
    Level4012: number;
    Level4013: number;
    Level4014: number;
    Level4015: number;
    Level4016: number;
    Level4017: number;
    Level4018: number;
    Level4019: number;
}

interface IStatistics {
    EquationTapCount: number;
    TickCount: number;
    ElapsedTimeSinceLastPrestige: number;
    RealElapsedTimeSinceLastPrestige: number;
    RealElapsedTimeSinceLastSupremacy: number;
    RealElapsedTimeSinceLastGraduation: number;
    DurationOfLastPrestige: number;
    DurationOfLastSupremacy: number;
    PrestigeCount: number;
    SupremacyCount: number;
    GraduationCount: number;
    MaxBaseDt: IBigNumber;
    PreviousB: IBigNumber;
    PreGraduationCumulativeFunctionValue: IBigNumber;
    PreSupremacyCumulativeFunctionValue: IBigNumber;
    PrePrestigeCumulativeFunctionValue: IBigNumber;
    AdWatchedCount: number;
    RealElapsedOnlineTime: number;
    RealElapsedGameTime: number;
    InstallationTimeUtc: Date;
}

interface IStory {
    ChapterUnlocked0: boolean;
    ChapterUnlocked1: boolean;
    ChapterUnlocked2: boolean;
    ChapterUnlocked3: boolean;
    ChapterUnlocked4: boolean;
    ChapterUnlocked5: boolean;
    ChapterUnlocked6: boolean;
    ChapterUnlocked7: boolean;
    ChapterUnlocked8: boolean;
    ChapterUnlocked9: boolean;
    ChapterUnlocked10: boolean;
    ChapterUnlocked11: boolean;
    ChapterUnlocked12: boolean;
    ChapterUnlocked13: boolean;
    ChapterUnlocked14: boolean;
    ChapterUnlocked15: boolean;
    ChapterUnlocked16: boolean;
    ChapterUnlocked17: boolean;
    ChapterUnlocked18: boolean;
    ChapterUnlocked19: boolean;
    ChapterUnlocked20: boolean;
    ChapterUnlocked21: boolean;
    ChapterUnlocked22: boolean;
}

interface IStudents {
    Amount: IBigNumber;
    UsedAmount: IBigNumber;
}

interface ITheories {
    ActiveTheoryId: number;
}

interface ITheory {
    [key: string]: string;
}

interface ITime {
    Value: IBigNumber;
    Delta: IBigNumber;
    FreeDelta: IBigNumber;
    DeltaMultiplier: IBigNumber;
    AccelerationEnabled: boolean;
}

interface IUpgrade {
    Level0: number;
    Power0: IBigNumber;
    IsAutoBuyable0: boolean;
    Level1: number;
    Power1: IBigNumber;
    IsAutoBuyable1: boolean;
    Level1000: number;
    Power1000: IBigNumber;
    IsAutoBuyable1000: boolean;
    Level1001: number;
    Power1001: IBigNumber;
    IsAutoBuyable1001: boolean;
    Level1002: number;
    Power1002: IBigNumber;
    IsAutoBuyable1002: boolean;
    Level1003: number;
    Power1003: IBigNumber;
    IsAutoBuyable1003: boolean;
    Level1004: number;
    Power1004: IBigNumber;
    IsAutoBuyable1004: boolean;
    Level1005: number;
    Power1005: IBigNumber;
    IsAutoBuyable1005: boolean;
    Level1006: number;
    Power1006: IBigNumber;
    IsAutoBuyable1006: boolean;
    Level1007: number;
    Power1007: IBigNumber;
    IsAutoBuyable1007: boolean;
    Level1008: number;
    Power1008: IBigNumber;
    IsAutoBuyable1008: boolean;
    Level1009: number;
    Power1009: IBigNumber;
    IsAutoBuyable1009: boolean;
    Level1010: number;
    Power1010: IBigNumber;
    IsAutoBuyable1010: boolean;
    Level1011: number;
    Power1011: IBigNumber;
    IsAutoBuyable1011: boolean;
    Level1012: number;
    Power1012: IBigNumber;
    IsAutoBuyable1012: boolean;
    Level1013: number;
    Power1013: IBigNumber;
    IsAutoBuyable1013: boolean;
    Level1014: number;
    Power1014: IBigNumber;
    IsAutoBuyable1014: boolean;
    Level1015: number;
    Power1015: IBigNumber;
    IsAutoBuyable1015: boolean;
    Level1016: number;
    Power1016: IBigNumber;
    IsAutoBuyable1016: boolean;
    Level1017: number;
    Power1017: IBigNumber;
    IsAutoBuyable1017: boolean;
    Level1018: number;
    Power1018: IBigNumber;
    IsAutoBuyable1018: boolean;
    Level2000: number;
    Power2000: IBigNumber;
    IsAutoBuyable2000: boolean;
    Level2001: number;
    Power2001: IBigNumber;
    IsAutoBuyable2001: boolean;
    Level3000: number;
    Power3000: IBigNumber;
    IsAutoBuyable3000: boolean;
    Level3001: number;
    Power3001: IBigNumber;
    IsAutoBuyable3001: boolean;
    Level3002: number;
    Power3002: IBigNumber;
    IsAutoBuyable3002: boolean;
}

interface IVariable {
    Level0: number;
    FreeLevel0: number;
    Factor0: IBigNumber;
    Exponent0: IBigNumber;
    IsAvailable0: boolean;
    IsAutoBuyable0: boolean;
    Level1: number;
    FreeLevel1: number;
    Factor1: IBigNumber;
    Exponent1: IBigNumber;
    IsAvailable1: boolean;
    IsAutoBuyable1: boolean;
    Level2: number;
    FreeLevel2: number;
    Factor2: IBigNumber;
    Exponent2: IBigNumber;
    IsAvailable2: boolean;
    IsAutoBuyable2: boolean;
    Level3: number;
    FreeLevel3: number;
    Factor3: IBigNumber;
    Exponent3: IBigNumber;
    IsAvailable3: boolean;
    IsAutoBuyable3: boolean;
    Level4: number;
    FreeLevel4: number;
    Factor4: IBigNumber;
    Exponent4: IBigNumber;
    IsAvailable4: boolean;
    IsAutoBuyable4: boolean;
    Level5: number;
    FreeLevel5: number;
    Factor5: IBigNumber;
    Exponent5: IBigNumber;
    IsAvailable5: boolean;
    IsAutoBuyable5: boolean;
    Level6: number;
    FreeLevel6: number;
    Factor6: IBigNumber;
    Exponent6: IBigNumber;
    IsAvailable6: boolean;
    IsAutoBuyable6: boolean;
    Level7: number;
    FreeLevel7: number;
    Factor7: IBigNumber;
    Exponent7: IBigNumber;
    IsAvailable7: boolean;
    IsAutoBuyable7: boolean;
    Level8: number;
    FreeLevel8: number;
    Factor8: IBigNumber;
    Exponent8: IBigNumber;
    IsAvailable8: boolean;
    IsAutoBuyable8: boolean;
    Level9: number;
    FreeLevel9: number;
    Factor9: IBigNumber;
    Exponent9: IBigNumber;
    IsAvailable9: boolean;
    IsAutoBuyable9: boolean;
    Level10: number;
    FreeLevel10: number;
    Factor10: IBigNumber;
    Exponent10: IBigNumber;
    IsAvailable10: boolean;
    IsAutoBuyable10: boolean;
    Level11: number;
    FreeLevel11: number;
    Factor11: IBigNumber;
    Exponent11: IBigNumber;
    IsAvailable11: boolean;
    IsAutoBuyable11: boolean;
    Level12: number;
    FreeLevel12: number;
    Factor12: IBigNumber;
    Exponent12: IBigNumber;
    IsAvailable12: boolean;
    IsAutoBuyable12: boolean;
    Level13: number;
    FreeLevel13: number;
    Factor13: IBigNumber;
    Exponent13: IBigNumber;
    IsAvailable13: boolean;
    IsAutoBuyable13: boolean;
    Level14: number;
    FreeLevel14: number;
    Factor14: IBigNumber;
    Exponent14: IBigNumber;
    IsAvailable14: boolean;
    IsAutoBuyable14: boolean;
    Level15: number;
    FreeLevel15: number;
    Factor15: IBigNumber;
    Exponent15: IBigNumber;
    IsAvailable15: boolean;
    IsAutoBuyable15: boolean;
    Level16: number;
    FreeLevel16: number;
    Factor16: IBigNumber;
    Exponent16: IBigNumber;
    IsAvailable16: boolean;
    IsAutoBuyable16: boolean;
    Level17: number;
    FreeLevel17: number;
    Factor17: IBigNumber;
    Exponent17: IBigNumber;
    IsAvailable17: boolean;
    IsAutoBuyable17: boolean;
    Level18: number;
    FreeLevel18: number;
    Factor18: IBigNumber;
    Exponent18: IBigNumber;
    IsAvailable18: boolean;
    IsAutoBuyable18: boolean;
    Level19: number;
    FreeLevel19: number;
    Factor19: IBigNumber;
    Exponent19: IBigNumber;
    IsAvailable19: boolean;
    IsAutoBuyable19: boolean;
}