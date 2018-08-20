@Autowired
	private InspectionCaseService caseService;
	
	@RequestMapping(value="/getInspCaseList",method=RequestMethod.POST)
	public ResponseDTO getInspCaseList(InspCaseDTO caseDto) {
		return caseService.getInspCaseInfos(caseDto);
	}
	
	
	@RequestMapping(value="/rotateInspCaseState",method=RequestMethod.POST)
	public ResponseDTO rotateInspCaseState(InspCaseDTO caseDto) {
		return caseService.rotateInspCaseState(caseDto.getAssigneeUserId());
	}
	
	@RequestMapping(value="/getInspCaseInfo",method=RequestMethod.POST)
	public ResponseDTO getInspCaseInfo(InspCaseDTO caseDto) {
		return caseService.getInspCaseInfo(caseDto.getCaseId());
	}
	
	@RequestMapping(value="/completeInspCase",method=RequestMethod.POST)
	public ResponseDTO completeInspCase(InspCaseDTO caseDto) {
		return caseService.completeInspCase(caseDto);
	}