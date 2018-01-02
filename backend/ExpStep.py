# This file is part of MCV4U0 ISP.
#
# MCV4U0 ISP is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# MCV4U0 ISP is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with MCV4U0 ISP. If not, see <http://www.gnu.org/licenses/>.

from sympy import latex
from sympy import integrate
from sympy.abc import x

from Step import Step
from Step import PLACEHOLDER_CONST
from Step import PLACEHOLDER_VAR

RULE_NAME = "exponent rule"
RULE_FORMULA = "\\int {0}^{1} \\, dx = \\frac{{ {0}^{1} }}{{ \\log ({0}) }}"
RULE_RESTRICTION = "{0} \\neq 1"

class ExpStep(Step):

	# Initialize the step.
	def __init__(self, step):
		super().__init__(step, RULE_NAME, RULE_FORMULA)
		self.ruleRestriction = RULE_RESTRICTION
		self.exponent = latex(self.step.exp)
		self.base = latex(self.step.base)
		self.formula = self.step.context

	# Get the text for applying the rule.
	def getText(self) -> str:
		rule = "The {} says that {} as long as {}.".format(self.ruleName, self.ruleFormula.format(PLACEHOLDER_CONST, PLACEHOLDER_VAR), self.ruleRestriction.format(PLACEHOLDER_CONST))
		sub = "Here, {} = {} and {} = {}.".format(PLACEHOLDER_CONST, self.base, PLACEHOLDER_VAR, self.exponent)
		solution = "So, {}".format(self.ruleFormula.format(self.base, self.exponent))
		return "{}\n{}\n{}".format(rule, sub, solution)