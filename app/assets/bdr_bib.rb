require 'bibtex'
require 'json'

# convert bibtex to json
b = BibTeX.open('./bderenzi_citations_clean.bib')
File.open('bderenzi_citations.json', 'w') do |f|
	out = JSON.pretty_generate(JSON.parse(b.to_json)).to_s
	f.write(out.gsub!('"{{','"').gsub!('}}"','"').gsub!('"{','"').gsub!('}"','"'))
end
