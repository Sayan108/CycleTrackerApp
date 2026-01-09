import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  datePickerPlaceholder: {
    backgroundColor: '#F7FAFC',
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 20,
    alignItems: 'center',
  },
  modeCardActive: {
    backgroundColor: '#FF7E67',
    borderColor: '#FF7E67',
    transform: [{scale: 1.02}], // Subtle pop effect
  },
  container: {flex: 1, backgroundColor: '#F9FAFB'},
  scrollContainer: {flexGrow: 1},
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {flexGrow: 1, paddingBottom: 20},
  nonScrollContent: {flex: 1, paddingBottom: 20},
  // Auth Styles
  authContainer: {flex: 1, justifyContent: 'center'},
  loginCard: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 30,
    padding: 30,
    elevation: 10,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  authInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    color: '#333',
  },
  authBtn: {
    backgroundColor: '#FF7E67',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  authBtnText: {color: 'white', fontWeight: 'bold', fontSize: 16},

  // New Google Login Styles
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 20,
  },
  googleBtnText: {marginLeft: 10, fontWeight: '600', color: '#444'},
  orDivider: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  dividerLine: {flex: 1, height: 1, backgroundColor: '#EEE'},
  orText: {marginHorizontal: 10, color: '#999', fontSize: 12},
  hintText: {
    textAlign: 'center',
    color: '#FF7E67',
    marginBottom: 10,
    fontWeight: '600',
  },

  imgGradientStrip: {
    height: 60,
    marginHorizontal: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  quickActionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3B5D',
    marginBottom: 15,
  },
  quickActionRow: {flexDirection: 'row', justifyContent: 'space-between'},
  qaItem: {alignItems: 'center', width: (width - 60) / 4},
  qaIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  qaLabel: {fontSize: 12, color: '#1A3B5D', fontWeight: '500'},

  calendarContainerCard: {
    backgroundColor: '#F8F9FA',
    margin: 15,
    borderRadius: 25,
    padding: 20,
    paddingBottom: 30,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  monthLabel: {fontSize: 18, fontWeight: '700', color: '#1A3B5D'},
  weekLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  loginHeroTitle: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '700',
    marginTop: 12,
  },

  loginHeroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },

  loginCardResponsive: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 32,
  },

  weekDayText: {
    width: (width - 100) / 7,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  calendarGrid: {flexDirection: 'row', flexWrap: 'wrap'},
  dayCellContainer: {
    width: (width - 110) / 7,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayCircleBase: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumberText: {fontSize: 15, fontWeight: '500', color: '#333'},
  dayPeriod: {backgroundColor: '#FF7E67'},
  dayPeriodLight: {backgroundColor: '#FFD6D6'},
  dayFertile: {backgroundColor: '#C5E6E3'},
  dayTodayBorder: {borderWidth: 2, borderColor: '#008B8B'},

  // Onboarding Styles
  stepIndicator: {marginTop: 20, marginBottom: 40, alignItems: 'center'},
  onboardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A3B5D',
    marginBottom: 10,
  },
  onboardSub: {fontSize: 16, color: '#666', marginBottom: 30, lineHeight: 24},
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  // modeCardActive: { backgroundColor: '#FF8E8E', borderColor: '#FF8E8E' },
  modeCardText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
    color: '#333',
  },
  onboardInputContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 40,
  },
  onboardValueInput: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FF7E67',
    borderBottomWidth: 3,
    borderBottomColor: '#FF7E67',
    minWidth: 80,
    textAlign: 'center',
  },
  onboardUnit: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginLeft: 15,
  },
  syncToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  syncLabel: {fontSize: 16, fontWeight: '600', color: '#333'},

  // First Time User Home
  welcomeBanner: {margin: 20, padding: 25, borderRadius: 25},
  welcomeTitle: {color: 'white', fontSize: 22, fontWeight: 'bold'},
  welcomeSub: {color: 'white', opacity: 0.9, marginTop: 5, lineHeight: 20},
  welcomeBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  welcomeBtnText: {color: '#4facfe', fontWeight: 'bold'},

  // Original Existing Styles
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  navTitle: {fontSize: 20, fontWeight: '700', color: '#1A3B5D'},
  section: {paddingHorizontal: 20, marginTop: 20},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  sectionTitle: {fontSize: 18, fontWeight: '700', color: '#1A3B5D'},
  seeAllText: {color: '#FF7E67', fontWeight: '600'},
  gradientCard: {
    margin: 20,
    borderRadius: 28,
    padding: 25,
    height: 320,
    justifyContent: 'space-between',
    elevation: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  legendItem: {flexDirection: 'row', alignItems: 'center'},
  legendDot: {width: 14, height: 14, borderRadius: 7, marginRight: 8},
  legendLabel: {fontSize: 13, color: '#666'},
  gradHeader: {color: 'white', fontSize: 22, fontWeight: '700'},
  dayText: {color: 'white', fontSize: 68, fontWeight: '800'},
  phaseText: {color: 'white', fontSize: 18, opacity: 0.9},
  gradStatsRow: {flexDirection: 'row', gap: 12},
  gradStatBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 18,
  },
  statLabel: {color: 'black', fontSize: 12, opacity: 0.8},
  statVal: {color: 'black', fontSize: 18, fontWeight: '700', marginTop: 4},
  whiteCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 15,
    elevation: 2,
  },
  whiteCardRow: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMainText: {fontSize: 16, fontWeight: '600', color: '#333'},
  cardSubText: {fontSize: 13, color: '#888', marginTop: 2},
  cardDate: {fontSize: 15, fontWeight: '600', color: '#333'},
  cardDays: {fontSize: 12, color: '#888', marginTop: 2},
  wellnessMargin: {marginBottom: 15},
  wellnessTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  wellnessLabel: {fontSize: 14, color: '#444', fontWeight: '500'},
  wellnessVal: {fontSize: 13, color: '#999'},
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logTitle: {fontSize: 15, fontWeight: '600', color: '#333'},
  logStatus: {fontSize: 13, color: '#888'},
  tabStyle: {height: 85, borderTopWidth: 0, elevation: 20},
  fab: {
    top: -25,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF7E67',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 3,
  },
  articleImg: {
    height: 160,
    backgroundColor: '#EADCF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleTag: {
    color: '#FF8E8E',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3B5D',
    marginVertical: 8,
  },
  articleSnippet: {fontSize: 14, color: '#666', lineHeight: 20},
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  readTime: {color: '#999', fontSize: 12},
  readMore: {color: '#FF8E8E', fontWeight: '700'},

  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },

  pageSubtitle: {
    color: '#777',
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  inputLabel: {
    color: '#666',
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  toggleRow: {
    flexDirection: 'row',
    gap: 8,
  },

  toggleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
  },

  toggleButtonActive: {
    backgroundColor: '#008B8B',
  },

  toggleText: {
    textAlign: 'center',
    color: '#444',
    fontWeight: '500',
  },

  toggleTextActive: {
    color: '#FFF',
  },

  dateButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },

  dateButtonText: {
    textAlign: 'center',
    fontWeight: '500',
  },

  infoBox: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
  },

  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },

  profileHeader: {alignItems: 'center', marginVertical: 20},
  avatarContainer: {width: 90, height: 90, position: 'relative'},
  avatarGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1CB0A8',
    padding: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  userNameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3B5D',
    marginTop: 12,
    textAlign: 'center',
  },
  userEmail: {fontSize: 13, color: '#999', marginTop: 4},

  summaryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    marginBottom: 20,
  },
  statItem: {flex: 1, alignItems: 'center'},
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F0F0F0',
  },

  iconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rowHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 15},

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tBtnActive: {backgroundColor: '#FF7E67'},
  tText: {fontSize: 14, color: '#666', fontWeight: '600', marginLeft: 8},
  tTextActive: {color: 'white'},

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLabel: {fontSize: 15, color: '#444', fontWeight: '500'},
  smallInput: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF7E67',
  },

  lmpButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 15,
    borderRadius: 12,
  },
  lmpLabel: {color: '#FF7E67', fontWeight: '600'},
  lmpValue: {color: '#333', fontWeight: 'bold'},

  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginLeft: 10,
    lineHeight: 18,
  },

  /* ================= DATE PICKER ================= */

  datePickerBtn: {
    marginTop: 18,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#EFEFF4',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 4,
  },

  datePickerText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
  },

  datePickerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= DATE LABEL ================= */

  dateLabel: {
    marginTop: 14,
    fontSize: 13,
    color: '#6B6B6B',
  },

  /* ================= IOS PICKER MODAL ================= */

  iosPickerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  iosPickerContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },

  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFF4',
  },

  iosPickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },

  iosPickerAction: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF8E8E',
  },

  /* ================= ERROR STATE ================= */

  dateError: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },

  dateErrorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#FF6B6B',
  },
});
